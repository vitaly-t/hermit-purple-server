import { Block, Receipt, SignedTransaction } from '@mutajs/client-raw';

export type RawBlock = Omit<Block, '__typename'>;
export type RawTransaction = Omit<SignedTransaction, '__typename'>;
export type RawReceipt = Omit<Receipt, '__typename'>;
