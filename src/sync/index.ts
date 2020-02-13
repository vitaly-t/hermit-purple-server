import {
  PrismaClient,
  ProofCreateWithoutBlocksInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import { Client, utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { debug } from 'debug';
import { SYNC_CONCURRENCY } from '../config';
import { muta } from '../muta';
import { BlockTransactionsConverter } from './parse';
import { fetchWholeBlock } from './fetch';
import { checkErrorWithDuplicateTx, removeDuplicateTx } from './hack';
import { GetBlockQuery } from 'muta-sdk/build/main/client/codegen/sdk';

const info = debug('sync:info');
const error = debug('sync:error');

export const client = muta.client();
export const rawClient = client.getRawClient();
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

  /**
   * Muta RPC client
   */
  private client: Client;

  /**
   * Muta Raw RPC client
   */
  private rawClient: ReturnType<Client['getRawClient']>;

  constructor(options: SyncOptions) {
    this.localHeight = 0;
    this.remoteHeight = 0;

    this.client = client;
    this.rawClient = rawClient;
  }

  private async refreshRemoteHeight(): Promise<number> {
    const remoteBlock = await this.rawClient.getBlock();
    return utils.hexToNum(remoteBlock.getBlock.header.execHeight);
  }

  private async refreshLocalHeight(): Promise<number> {
    const blocks = await prisma.block.findMany({
      select: { height: true },
      last: 1,
    });
    this.localHeight = (blocks[0]?.height ?? 0) + 1;
    return this.localHeight;
  }

  private async saveBlock(
    rawBlock: GetBlockQuery,
    transactions: ReturnType<BlockTransactionsConverter['convert']>,
    proof: ProofCreateWithoutBlocksInput,
    validators: ValidatorCreateWithoutBlocksInput[],
  ) {
    const header = rawBlock.getBlock.header;

    try {
      await prisma.block.create({
        data: {
          height: utils.hexToNum(header.height),
          transactionsCount: transactions.length,
          transactions: {
            create: transactions,
          },
          timestamp: new Date(Number(utils.hexToNum(header.timestamp) + '000')),
          orderRoot: header.orderRoot,
          stateRoot: header.stateRoot,
          proposer: header.proposer,
          proof: { create: proof },
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
        await this.saveBlock(rawBlock, correctTransactions, proof, validators);
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
          await this.client.waitForNextNBlock(1);
          continue;
        }

        info(`start: ${localHeight}, end: ${remoteHeight} `);

        const { block, txs, receipts } = await fetchWholeBlock(localHeight);
        const header = block.getBlock.header;

        info(`fetched ${txs.length} txs and ${receipts.length} receipts`);

        const converter = new BlockTransactionsConverter();
        const transactions = converter.convert(txs, receipts);

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

        const proof: ProofCreateWithoutBlocksInput = {
          ...header.proof,
          height: utils.hexToNum(header.proof.height),
          round: utils.hexToNum(header.proof.round),
        };

        await this.saveBlock(block, transactions, proof, validators);
      } catch (e) {
        error(e);
      }
    }
  }
}

new BlockSynchronizer({}).run();
