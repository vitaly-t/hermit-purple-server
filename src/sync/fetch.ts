import { range } from 'lodash';
import { utils } from 'muta-sdk';
import {
  GetBlockQuery,
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { SYNC_CONCURRENCY } from '../config';
import { chunkAndBatch } from './fetch/batch';
import { rawClient } from './muta';

/**
 * ```
 * _${index}: getTransaction(txHash: "${txHash}") {
 *    ...transactionKeys
 *  }
 * ```
 * @param txHash
 * @param index
 */
const generateTransactionQuerySegment = (txHash: string, index: number) => `
_${index}: getTransaction(txHash: "${txHash}") {
  ...transactionKeys
}
`;

/**
 * a GraphQL fragment for transaction keys
 * ```graphql
 * fragment transactionKeys on SignedTransaction {
 *    chainId
 *    cyclesLimit
 *    cyclesPrice
 *    method
 *    nonce
 *    payload
 *    pubkey
 *    serviceName
 *    signature
 *    timeout
 *    txHash
 * }
 * ```
 */
export const txFragment = /*GraphQL*/ `
fragment transactionKeys on SignedTransaction {
    chainId
    cyclesLimit
    cyclesPrice
    method
    nonce
    payload
    pubkey
    serviceName
    signature
    timeout
    txHash
}
`;

function fetchIndexedTransaction(orderedTransactionHashes: string[]) {
  return chunkAndBatch<GetTransactionQuery['getTransaction']>({
    taskSource: orderedTransactionHashes,
    fragment: txFragment,
    generateQuerySegment: generateTransactionQuerySegment,
    chunkSize: 200,
    concurrency: SYNC_CONCURRENCY,
  });
}

const generateReceiptQuerySegment = (txHash: string, index: number) => `
_${index}: getReceipt(txHash: "${txHash}") {
  ...receiptKeys
}
`;
const receiptFragment = `
fragment receiptKeys on Receipt {
    txHash
    height
    cyclesUsed
    events {
      data
      service
    }
    stateRoot
    response {
      serviceName
      method
      ret
      isError
    }
}
`;

async function fetchIndexedReceipt(orderedTxHashes: Array<string>) {
  return chunkAndBatch<GetReceiptQuery['getReceipt']>({
    generateQuerySegment: generateReceiptQuerySegment,
    fragment: receiptFragment,
    taskSource: orderedTxHashes,
    chunkSize: 200,
    concurrency: SYNC_CONCURRENCY,
  });
}

export async function fetchWholeBlock(
  height: number,
): Promise<{
  block: GetBlockQuery;
  txs: GetTransactionQuery[];
  receipts: GetReceiptQuery[];
}> {
  const block = await rawClient.getBlock({
    height: utils.toHex(height),
  });
  const orderedTxHashes = block.getBlock.orderedTxHashes;

  // const txs = await Bluebird.all(orderedTxHashes).map(
  //   txHash => rawClient.getTransaction({ txHash }),
  //   { concurrency: SYNC_CONCURRENCY },
  // );
  //
  // const receipts = await Bluebird.all(orderedTxHashes).map(
  //   txHash => rawClient.getReceipt({ txHash }),
  //   { concurrency: SYNC_CONCURRENCY },
  // );

  if (orderedTxHashes.length === 0) return { block, txs: [], receipts: [] };

  const indexedTransaction = await fetchIndexedTransaction(orderedTxHashes);
  const txs: GetTransactionQuery[] = range(orderedTxHashes.length).map<
    GetTransactionQuery
  >((i: number) => ({ getTransaction: indexedTransaction[`_${i}`] }));

  const indexedReceipt = await fetchIndexedReceipt(orderedTxHashes);
  const receipts: GetReceiptQuery[] = range(orderedTxHashes.length).map<
    GetReceiptQuery
  >((i: number) => ({ getReceipt: indexedReceipt[`_${i}`] }));

  return { block, txs, receipts };
}
