import { logger, utils } from '@muta-extra/common';
import { Client } from '@mutajs/client';
import {
  GetReceiptQuery,
  getSdk,
  GetTransactionQuery,
} from '@mutajs/client-raw';
import { defaults, range } from 'lodash';
import { hex, hexAddress, hexHash, hexUint64 } from '../clean/hex';
import {
  IFetchRemoteAdapter,
  WholeBlock,
} from '../synchronizer/ISynchronizerAdapter';
import { chunkAndBatch } from './batch';

const info = logger.childLogger('sync');

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

function fetchIndexedTransaction(
  orderedTransactionHashes: string[],
  concurrency: number,
) {
  return chunkAndBatch<GetTransactionQuery['getTransaction']>({
    taskSource: orderedTransactionHashes,
    fragment: txFragment,
    generateQuerySegment: generateTransactionQuerySegment,
    chunkSize: 200,
    concurrency,
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
      response {
        code
        succeedData
        errorMessage
      }
    }
}
`;

async function fetchIndexedReceipt(
  orderedTxHashes: Array<string>,
  concurrency: number,
) {
  return chunkAndBatch<GetReceiptQuery['getReceipt']>({
    generateQuerySegment: generateReceiptQuerySegment,
    fragment: receiptFragment,
    taskSource: orderedTxHashes,
    chunkSize: 200,
    concurrency,
  });
}

interface FetcherOptions {
  concurrency: number;
}

export class DefaultRemoteFetcher implements IFetchRemoteAdapter {
  private rawClient: ReturnType<typeof getSdk>;

  private options: FetcherOptions;

  constructor(
    private client: Client = new Client(),
    options?: Partial<FetcherOptions>,
  ) {
    this.rawClient = client.getRawClient();

    this.options = defaults<any, FetcherOptions>(options, {
      concurrency: Number(process.env.HERMIT_FETCH_CONCURRENCY ?? 20),
    });
  }

  async getRemoteBlockHeight(): Promise<number> {
    const block = await this.rawClient.getBlock();
    return Number(block.getBlock.header.height);
  }

  async getRemoteBlockExecHeight(): Promise<number> {
    const block = await this.rawClient.getBlock();
    return Number(block.getBlock.header.execHeight);
  }

  async getWholeBlock(height: number): Promise<WholeBlock> {
    const block = await this.rawClient.getBlock({
      height: utils.toHex(height),
    });

    block.getBlock.hash = hexHash(block.getBlock.hash);
    const header = block.getBlock.header;
    block.getBlock.header = {
      ...header,
      prevHash: hexHash(header.prevHash),
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

    if (orderedTxHashes.length === 0) {
      return { block: block.getBlock, txs: [], receipts: [] };
    }

    const indexedTransaction = await fetchIndexedTransaction(
      orderedTxHashes,
      this.options.concurrency,
    );
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

    const indexedReceipt = await fetchIndexedReceipt(
      orderedTxHashes,
      this.options.concurrency,
    );
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

    return {
      block: block.getBlock,
      txs: txs.map(tx => tx.getTransaction),
      receipts: receipts.map(receipt => receipt.getReceipt),
    };
  }
}
