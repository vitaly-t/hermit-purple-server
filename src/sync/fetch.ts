import Axios from 'axios';
import { range } from 'lodash';
import { utils } from 'muta-sdk';
import {
  GetBlockQuery,
  GetReceiptQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { GetTransactionQuery } from 'muta-sdk/src/client/codegen/sdk';
import { rawClient } from './muta';

const axios = Axios.create({ baseURL: process.env.MUTA_ENDPOINT });

const queryTransaction = (txHash: string, index: number) => `
_${index}: getTransaction(txHash: "${txHash}") {
  ...transactionKeys
}
`;

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

async function fetchIndexedTransaction(orderedTxHashes: Array<string>) {
  return axios.post<{
    data: {
      [key: string]: GetTransactionQuery['getTransaction'];
    };
  }>('', {
    query: `
      {
        ${orderedTxHashes.map(queryTransaction).join('\n')}
      }
      ${txFragment}
    `,
  });
}

const queryReceipt = (txHash: string, index: number) => `
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
  return axios.post<{
    data: {
      [key: string]: GetReceiptQuery['getReceipt'];
    };
  }>('', {
    query: `
      {
        ${orderedTxHashes.map(queryReceipt).join('\n')}
      }
      ${receiptFragment}
    `,
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
  >((i: number) => ({ getTransaction: indexedTransaction.data.data[`_${i}`] }));

  const indexedReceipt = await fetchIndexedReceipt(orderedTxHashes);
  const receipts: GetReceiptQuery[] = range(orderedTxHashes.length).map<
    GetReceiptQuery
  >((i: number) => ({ getReceipt: indexedReceipt.data.data[`_${i}`] }));

  return { block, txs, receipts };
}
