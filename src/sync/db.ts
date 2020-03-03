import {
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import * as Knex from 'knex';
import { getDB } from './db/mongo';
import { Block, Transaction } from './db/types';
import { info } from './log';

const knex = Knex({
  client: 'pg',
  connection: process.env.POSTGRESQL_URL,
});

export async function saveWholeBlock(
  block: Block,
  transactions: TransactionCreateWithoutBlockInput[],
  validators: ValidatorCreateWithoutBlocksInput[],
) {
  const db = await getDB();

  await db.collection('block').insertOne(block);
  const txLength = transactions.length;
  if (!txLength) return;

  const transactionCollection = db.collection<Transaction>('transaction');

  const [latestTx] = await transactionCollection
    .find()
    .sort({ order: -1 })
    .limit(1)
    .toArray();

  // @ts-ignore
  const order = (latestTx?.order ?? 0) + 1;

  const inputTransactions = transactions.map<Transaction>((tx, i) => ({
    order: order + i,
    block: block.height,
    from: tx.from?.connect?.address as string,
    cyclesPrice: tx.cyclesPrice,
    cyclesLimit: tx.cyclesLimit,
    cyclesUsed: tx.cyclesUsed ?? null,
    timeout: tx.timeout,
    method: tx.method,
    serviceName: tx.serviceName,
    txHash: tx.txHash,
    chainId: tx.chainId,
    nonce: tx.nonce,
    receiptIsError: tx.receiptIsError ?? null,
    payload: tx.payload,
    pubkey: tx.pubkey,
    receiptRet: tx.receiptRet ?? null,
    signature: tx.signature,
  }));

  info(`block: ${block.height}, start insert ${txLength} txs`);
  await db.collection('transaction').insertMany(inputTransactions);
  info(`block: ${block.height}, end insert ${txLength} txs`);
}
