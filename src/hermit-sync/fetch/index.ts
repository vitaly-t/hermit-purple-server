import { rawClient } from "@hermit/muta";
import { hex, hexAddress, hexHash, hexUint64 } from '@hermit/hermit-sync/clean/hex';
import { info } from '@hermit/hermit-sync/log';
import { hexToNum, toHex } from '@hermit/hermit-utils/bytes';
import { range } from 'lodash';
import {
  GetBlockQuery,
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { HERMIT_FETCH_CONCURRENCY } from '../../hermit-config';
import { chunkAndBatch } from '../fetch/batch';

export async function fetchRemoteBlockHeight() {
  const remoteBlock = await rawClient.getBlock();
  return hexToNum(remoteBlock.getBlock.header.execHeight);
}

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
    concurrency: HERMIT_FETCH_CONCURRENCY,
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
    concurrency: HERMIT_FETCH_CONCURRENCY,
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
    height: toHex(height),
  });

  block.getBlock.hash = hexHash(block.getBlock.hash);
  const header = block.getBlock.header;
  block.getBlock.header = {
    ...header,
    preHash: hexHash(header.preHash),
    validators: header.validators.map(validator => ({
      ...validator,
      address: hexAddress(validator.address),
    })),
    chainId: hexHash(header.chainId),
    proof: {
      ...header.proof,
      blockHash: hexHash(header.proof.blockHash),
      height: hexUint64(header.proof.height),
      round: hexUint64(header.proof.round),
      signature: hex(header.proof.signature),
    },
    validatorVersion: hexUint64(header.validatorVersion),
    execHeight: hexUint64(header.execHeight),
    orderRoot: hexUint64(header.orderRoot),
    proposer: hexAddress(header.proposer),
    stateRoot: hexHash(header.stateRoot),
    timestamp: hex(header.timestamp),
  };

  const orderedTxHashes = block.getBlock.orderedTxHashes;

  if (orderedTxHashes.length === 0) return { block, txs: [], receipts: [] };

  const indexedTransaction = await fetchIndexedTransaction(orderedTxHashes);
  info(`fetched ${orderedTxHashes.length} txs`);

  const txs: GetTransactionQuery[] = range(orderedTxHashes.length).map<
    GetTransactionQuery
  >((i: number) => {
    const tx = indexedTransaction[`_${i}`];
    return {
      getTransaction: {
        pubkey: hex(tx.pubkey),
        payload: tx.payload,
        serviceName: tx.serviceName,
        chainId: hex(tx.chainId),
        cyclesLimit: hex(tx.cyclesLimit),
        cyclesPrice: hex(tx.cyclesPrice),
        method: tx.method,
        nonce: hex(tx.nonce),
        signature: hex(tx.signature),
        timeout: hex(tx.timeout),
        txHash: hex(tx.txHash),
      },
    };
  });
  info(`parsed ${orderedTxHashes.length} txs`);

  const indexedReceipt = await fetchIndexedReceipt(orderedTxHashes);
  info(`fetched ${orderedTxHashes.length} receipts`);

  const receipts: GetReceiptQuery[] = range(orderedTxHashes.length).map<
    GetReceiptQuery
  >((i: number) => {
    const receipt = indexedReceipt[`_${i}`];

    return {
      getReceipt: {
        ...receipt,
        txHash: hex(receipt.txHash),
        cyclesUsed: hex(receipt.cyclesUsed),
        height: hex(receipt.height),
        stateRoot: hex(receipt.stateRoot),
      },
    };
  });
  info(`parsed ${orderedTxHashes.length} receipts`);

  return { block, txs, receipts };
}
