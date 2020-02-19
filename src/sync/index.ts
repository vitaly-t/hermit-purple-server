require('dotenv').config();

import {
  PrismaClient,
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import { AssetService, utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { BigNumber } from 'bignumber.js';
import { debug } from 'debug';
import { SYNC_CONCURRENCY } from '../config';
import { muta } from '../muta';
import { BalanceTask, BlockTransactionsConverter } from './parse';
import { fetchWholeBlock } from './fetch';
import { checkErrorWithDuplicateTx, removeDuplicateTx } from './hack';
import { GetBlockQuery } from 'muta-sdk/build/main/client/codegen/sdk';

const info = debug('sync:info');
const error = debug('sync:error');

export const client = muta.client();
export const rawClient = client.getRawClient();

// @ts-ignore
export const readonlyAssetService = new AssetService(client, null);

export const prisma = new PrismaClient();

interface SyncOptions {
  startHeight?: number;
}

class BlockSynchronizer {
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

  private async refreshRemoteHeight(): Promise<number> {
    const remoteBlock = await rawClient.getBlock();
    this.remoteHeight = utils.hexToNum(remoteBlock.getBlock.header.execHeight);
    return this.remoteHeight;
  }

  private async refreshLocalHeight(): Promise<number> {
    const blocks = await prisma.block.findMany({
      select: { height: true },
      last: 1,
    });
    this.localHeight = (blocks[0]?.height ?? 0) + 1;
    return this.localHeight;
  }

  private async updateBalance(updateBalanceTasks: BalanceTask) {
    const tasks = Array.from(updateBalanceTasks.entries());

    info(`${tasks.length} balance tasks start`);

    await Bluebird.all(tasks).map(
      async ([compound, [address, assetId]]) => {
        let {
          ret: { balance },
        } = await readonlyAssetService.get_balance({
          asset_id: assetId,
          user: address,
        });

        balance = new BigNumber(balance).toString(16);

        return prisma.balance.upsert({
          where: { compound },
          create: {
            compound,
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
      await prisma.block.create({
        data: {
          height: utils.hexToNum(header.height),
          execHeight: utils.hexToNum(header.execHeight),
          transactionsCount: transactions.length,
          transactions: {
            create: transactions,
          },
          timestamp: new Date(Number(utils.hexToNum(header.timestamp) + '000')),
          orderRoot: header.orderRoot,
          stateRoot: header.stateRoot,
          proposer: header.proposer,
          proofBitmap: header.proof.bitmap,
          proofBlockHash: header.proof.blockHash,
          proofRound: header.proof.round,
          proofSignature: header.proof.signature,
          preHash: header.preHash,
          validatorVersion: header.validatorVersion,
          validators: {
            connect: validators.map(v => ({ address: v.address })),
          },
        },
      });
    } catch (e) {
      if (checkErrorWithDuplicateTx(e)) {
        error(`found duplicate tx in #${this.localHeight}`);
        const correctTransactions = await removeDuplicateTx(transactions);
        await this.saveBlock(rawBlock, correctTransactions, validators);
      } else {
        throw e;
      }
    }
  }

  async run() {
    while (1) {
      try {
        const localHeight = await this.refreshLocalHeight();
        const remoteHeight = await this.refreshRemoteHeight();

        if (localHeight >= remoteHeight) {
          info(`waiting for remote new block`);
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
}

new BlockSynchronizer({}).run();
