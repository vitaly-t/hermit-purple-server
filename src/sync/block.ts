import {
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import { Promise as Bluebird } from 'bluebird';
import { utils } from 'muta-sdk';
import { GetBlockQuery } from 'muta-sdk/build/main/client/codegen/sdk';
import { SYNC_CONCURRENCY } from '../config';
import { prisma } from './';
import { hexU64 } from './clean/hex';
import { saveWholeBlock } from './db';
import { getDB } from './db/mongo';
import { Block } from './db/types';
import { fetchWholeBlock } from './fetch';
import { checkErrorWithDuplicateTx } from './hack';
import { error, info } from './log';
import { client, rawClient, readonlyAssetService } from './muta';
import { BalanceTask, BlockTransactionsConverter } from './transaction';

export interface SyncOptions {
  startHeight?: number;
}

export class BlockSynchronizer {
  /**
   * current local block height
   */
  private localHeight: number;

  /**
   * latest remote block height
   */
  private remoteHeight: number;

  constructor(options: SyncOptions) {
    this.localHeight = 0;
    this.remoteHeight = 0;
  }

  async run() {
    while (1) {
      try {
        const localHeight = await this.refreshLocalHeight();
        const remoteHeight = await this.refreshRemoteHeight();

        if (localHeight >= remoteHeight) {
          info(
            `local height: ${localHeight}, remote height: ${remoteHeight}, waiting for remote new block`,
          );
          await client.waitForNextNBlock(1);
          continue;
        }

        info(`start: ${localHeight}, end: ${remoteHeight} `);

        const { block, txs, receipts } = await fetchWholeBlock(localHeight);
        const header = block.getBlock.header;

        info(`fetched ${txs.length} txs and ${receipts.length} receipts`);

        const converter = new BlockTransactionsConverter(txs, receipts);
        const transactions = converter.getTransactionInput();
        // create accounts if not exists
        const addresses = converter.getRelevantAddresses();

        await Bluebird.all<string>(addresses).map(
          address =>
            prisma.account.upsert({
              where: { address },
              create: { address },
              update: {},
            }),
          { concurrency: SYNC_CONCURRENCY },
        );

        // create validators if not exists
        const validators: ValidatorCreateWithoutBlocksInput[] =
          header.validators;

        await Promise.all(
          validators.map(validator =>
            prisma.validator.upsert({
              where: { address: validator.address },
              create: {
                address: validator.address,
                proposeWeight: validator.proposeWeight,
                voteWeight: validator.voteWeight,
              },
              update: {},
            }),
          ),
        );

        await this.saveBlock(block, transactions, validators);
        await this.updateBalance(converter.getBalanceTask());
      } catch (e) {
        error(e);
      }
    }
  }

  private async refreshRemoteHeight(): Promise<number> {
    const remoteBlock = await rawClient.getBlock();
    this.remoteHeight = utils.hexToNum(remoteBlock.getBlock.header.execHeight);
    return this.remoteHeight;
  }

  private async refreshLocalHeight(): Promise<number> {
    const db = await getDB();
    const blocks = await db
      .collection<Block>('block')
      .find()
      .sort({ height: -1 })
      .limit(1)
      .toArray();

    this.localHeight = (blocks[0]?.height ?? 0) + 1;
    return this.localHeight;
  }

  private async updateBalance(updateBalanceTasks: BalanceTask) {
    const tasks = Array.from(updateBalanceTasks.entries());

    info(`${tasks.length} balance tasks start`);

    await Bluebird.all(tasks).map(
      async ([addressAssetCompoundHash, [address, assetId]]) => {
        let receipt = await readonlyAssetService.get_balance({
          asset_id: assetId,
          user: address,
        });

        const balance = hexU64(receipt.ret.balance);

        return prisma.balance.upsert({
          where: { compound: addressAssetCompoundHash },
          create: {
            compound: addressAssetCompoundHash,
            account: { connect: { address } },
            asset: { connect: { assetId } },
            balance,
          },
          update: { balance },
        });
      },
      { concurrency: SYNC_CONCURRENCY },
    );

    info(`${tasks.length} balance tasks updated`);
  }

  private async saveBlock(
    rawBlock: GetBlockQuery,
    transactions: TransactionCreateWithoutBlockInput[],
    validators: ValidatorCreateWithoutBlocksInput[],
  ) {
    const header = rawBlock.getBlock.header;

    try {
      await saveWholeBlock(
        {
          blockHash: rawBlock.getBlock.hash,
          height: utils.hexToNum(header.height),
          execHeight: utils.hexToNum(header.execHeight),
          transactionsCount: transactions.length,
          timestamp: header.timestamp,
          orderRoot: header.orderRoot,
          stateRoot: header.stateRoot,
          proposer: header.proposer,
          proofBitmap: header.proof.bitmap,
          proofBlockHash: header.proof.blockHash,
          proofRound: header.proof.round,
          proofSignature: header.proof.signature,
          preHash: header.preHash,
          validatorVersion: header.validatorVersion,
        },
        transactions,
        validators,
      );
    } catch (e) {
      const dupTxHash = checkErrorWithDuplicateTx(e);
      if (dupTxHash) {
        error(`found duplicate tx in #${this.localHeight}: ${dupTxHash}`);
        const correctTransactions = transactions.filter(
          tx => tx.txHash !== dupTxHash,
        );
        await this.saveBlock(rawBlock, correctTransactions, validators);
      } else {
        throw e;
      }
    }
  }
}
