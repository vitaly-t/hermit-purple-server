import { Block, Receipt, SignedTransaction } from '@mutajs/client-raw';

export type RawBlock = Pick<Block, 'hash' | 'orderedTxHashes'> & {
  header: Omit<Block['header'], 'orderSignedTransactionsHash'>;
};

export type RawTransaction = SignedTransaction;
export type RawReceipt = Receipt;
