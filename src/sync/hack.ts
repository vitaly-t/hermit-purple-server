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
  detail: string;
}): string {
  // for more information of error code, view the PostgrsSQL docs https://www.postgresql.org/docs/9.2/errcodes-appendix.html
  // the error detail message would be like this
  // Key ("txHash")=(a9d5a689fd26af6b894b0433793d50972d81f3c31535d1e16aa999024a156c4b) already exists.
  if (e?.code === '23505' && e?.detail?.includes('txHash')) {
    return e.detail.match(/[0-9a-f]{64}/)?.[0] ?? '';
  }
  return '';
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
