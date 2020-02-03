import {
  PrismaClient,
  ProofCreateWithoutBlocksInput,
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import { utils, addressFromPublicKey } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { debug } from 'debug';
import { MUTA_CHAINID, MUTA_ENDPOINT, SYNC_CONCURRENCY } from '../config';
import { muta } from '../muta';
import { syncReceipt } from './receipt';
import { toBuffer } from 'muta-sdk/build/main/utils';

const debugBlock = debug('sync:block');

export const rawClient = muta.client.getRawClient();
export const prisma = new PrismaClient();

/**
 * convert public key to address hex string without 0x
 * @param pubkey
 */
function addressFromPubkey(pubkey: string) {
  return addressFromPublicKey(toBuffer(pubkey)).toString('hex');
}

interface SyncOptions {
  endpoint: string;
  chainId: string;
}

export async function sync(options: SyncOptions) {
  try {
    const chainLatestBlock = await rawClient.getBlock();
    const latestBlockHeight = chainLatestBlock.getBlock.header.height;

    const apiLatestBlock = await prisma.block.findMany({
      first: 1,
      orderBy: {
        height: 'desc',
      },
    });

    let syncBlockHeight = (apiLatestBlock[0]?.height ?? 0) + 1;

    // TODO
    //  HACK: backward 15 block to ensure blocks are executed
    let targetBlockHeight = utils.hexToNum(latestBlockHeight) - 15;
    if (targetBlockHeight < 1) targetBlockHeight = 1;
    while (syncBlockHeight < targetBlockHeight) {
      debugBlock(`start: ${syncBlockHeight}, end: ${targetBlockHeight} `);

      const block = await rawClient.getBlock({
        height: utils.toHex(syncBlockHeight),
      });
      const header = block.getBlock.header;
      const orderedTxHashes = block.getBlock.orderedTxHashes;

      const txs = await Bluebird.all(orderedTxHashes).map(
        txHash => rawClient.getTransaction({ txHash }),
        { concurrency: SYNC_CONCURRENCY },
      );

      await Bluebird.all<string>(
        new Set(txs.map(tx => addressFromPubkey(tx.getTransaction.pubkey))),
      ).map(
        address =>
          prisma.account.upsert({
            where: { address },
            create: { address },
            update: {},
          }),
        { concurrency: SYNC_CONCURRENCY },
      );

      const transactions: TransactionCreateWithoutBlockInput[] = txs.map(
        tx => ({
          ...tx.getTransaction,
          account: {
            connect: {
              address: addressFromPublicKey(
                toBuffer(tx.getTransaction.pubkey),
              ).toString('hex'),
            },
          },
        }),
      );

      const validators: ValidatorCreateWithoutBlocksInput[] = header.validators.map(
        v => ({ ...v }),
      );

      await Promise.all(
        validators.map(v =>
          prisma.validator.upsert({
            where: {
              address: v.address,
            },
            create: {
              address: v.address,
              proposeWeight: v.proposeWeight,
              voteWeight: v.voteWeight,
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

      await prisma.block.create({
        data: {
          height: utils.hexToNum(header.height),
          transactionsCount: orderedTxHashes.length,
          transactions: {
            create: transactions,
          },
          timestamp: new Date(Number(utils.hexToNum(header.timestamp) + '000')),
          orderRoot: header.orderRoot,
          stateRoot: header.stateRoot,
          proposer: header.proposer,
          proof: {
            create: proof,
          },
          preHash: header.preHash,
          validatorVersion: header.validatorVersion,
          validators: {
            connect: validators.map(v => ({ address: v.address })),
          },
        },
      });

      await syncReceipt();

      syncBlockHeight++;
    }
  } catch (e) {
    console.error(e);
    await Bluebird.delay(500);
    await sync(options);
  }

  await Bluebird.delay(500);
  sync(options);
}

sync({
  endpoint: MUTA_ENDPOINT,
  chainId: MUTA_CHAINID,
});
