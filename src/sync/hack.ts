// IMPORTANT: PLEASE CAREFULLY USING THIS MODULE , ONLY FOR HACK SOMETHING

import { TransactionCreateWithoutBlockInput } from '@prisma/client';
import { prisma } from './index';

/**
 * now there is a bug in muta, that would pack a tx with different blocks,
 * if duplicate tx found, sync now skip the tx
 * @param e
 */
export function checkErrorWithDuplicateTx(e: {
  code: string;
  meta: { fieldName: string };
}) {
  return e?.code === 'P2002' && e?.meta?.fieldName?.includes('txHash');
}

/**
 * remove tx that already exists local
 * @param transactions
 */
export async function removeDuplicateTx(
  transactions: TransactionCreateWithoutBlockInput[],
) {
  const txHashes = transactions.map(tx => tx.txHash);

  const duplicateTransactions = await prisma.transaction.findMany({
    where: { txHash: { in: txHashes } },
  });

  const duplicateTxHashes = new Set(
    duplicateTransactions.map<string>(tx => tx.txHash),
  );
  return transactions.filter(tx => !duplicateTxHashes.has(tx.txHash));
}
