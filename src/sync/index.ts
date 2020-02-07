import {
  AssetCreateWithoutCreationTransactionInput,
  AssetTransferCreateWithoutTransactionInput,
  PrismaClient,
  ProofCreateWithoutBlocksInput,
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import { utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { debug } from 'debug';
import { BigNumber } from 'bignumber.js';
import { MUTA_CHAINID, MUTA_ENDPOINT, SYNC_CONCURRENCY } from '../config';
import { muta } from '../muta';
// import { syncReceipt } from './receipt';
import { safeJSONParse } from './parse';

const { toBuffer, addressFromPublicKey } = utils;
const trace = debug('sync:block');

export const rawClient = muta.client().getRawClient();
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
    const latestBlockHeight = chainLatestBlock.getBlock.header.execHeight;

    const apiLatestBlock = await prisma.block.findMany({
      first: 1,
      orderBy: {
        height: 'desc',
      },
    });

    let syncBlockHeight = (apiLatestBlock[0]?.height ?? 0) + 1;

    // TODO
    //  HACK: now only sync the executed block, need sync the newest block
    let targetBlockHeight = utils.hexToNum(latestBlockHeight);
    if (targetBlockHeight < 1) targetBlockHeight = 1;
    while (syncBlockHeight < targetBlockHeight) {
      trace(`start: ${syncBlockHeight}, end: ${targetBlockHeight} `);

      const block = await rawClient.getBlock({
        height: utils.toHex(syncBlockHeight),
      });
      const header = block.getBlock.header;
      const orderedTxHashes = block.getBlock.orderedTxHashes;

      const txs = await Bluebird.all(orderedTxHashes).map(
        txHash => rawClient.getTransaction({ txHash }),
        { concurrency: SYNC_CONCURRENCY },
      );

      const receipts = await Bluebird.all(orderedTxHashes).map(
        txHash => rawClient.getReceipt({ txHash }),
        { concurrency: SYNC_CONCURRENCY },
      );
      trace(`fetched ${txs.length} txs and ${receipts.length} receipts`);

      const addresses = new Set<string>();
      const transactions: TransactionCreateWithoutBlockInput[] = txs.map(
        (tx, i) => {
          const {
            serviceName,
            method,
            payload: payloadStr,
            pubkey,
          } = tx.getTransaction;
          const caller = addressFromPubkey(pubkey);
          const receipt = receipts[i]?.getReceipt;

          addresses.add(caller);

          let transfer: AssetTransferCreateWithoutTransactionInput | null = null;
          if (serviceName === 'asset' && method === 'transfer') {
            const payload = safeJSONParse<{
              asset_id: string;
              to: string;
              value: BigNumber;
            }>(payloadStr);

            addresses.add(payload.to);

            transfer = {
              asset: { connect: { assetId: payload.asset_id } },
              value: payload.value.toString(16),
              from: { connect: { address: caller } },
              to: { connect: { address: payload.to } },
            };
          }

          let asset: AssetCreateWithoutCreationTransactionInput | null = null;
          if (
            receipt &&
            !receipt.response.isError &&
            serviceName === 'asset' &&
            method === 'create_asset'
          ) {
            const payload = safeJSONParse<{
              supply: BigNumber;
              symbol: string;
              name: string;
              id: string;
            }>(receipt.response.ret);

            asset = {
              account: { connect: { address: caller } },
              assetId: payload.id,
              name: payload.name,
              symbol: payload.symbol,
              supply: payload.supply.toString(16),
            };
          }

          return {
            ...tx.getTransaction,
            ...(transfer ? { transfer: { create: transfer } } : {}),
            ...(asset ? { createdAsset: { create: asset } } : {}),
            account: {
              connect: { address: addressFromPubkey(tx.getTransaction.pubkey) },
            },
            receipt: {
              create: {
                cyclesUsed: receipt.cyclesUsed,
                events: {
                  create: receipt.events.map(x => ({
                    data: x.data,
                    service: x.service,
                  })),
                },
                response: {
                  create: {
                    isError: receipt.response.isError,
                    ret: receipt.response.ret,
                  },
                },
              },
            },
          };
        },
      );

      await Bluebird.all<string>(addresses).map(
        address =>
          prisma.account.upsert({
            where: { address },
            create: { address },
            update: {},
          }),
        { concurrency: SYNC_CONCURRENCY },
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
