import { Hash, Uint64 } from '@mutajs/types';
import { Block, Receipt, Transaction, Validator } from './model';

export type Maybe<T> = T | null;

export type MaybeAsync<T> = Promise<Maybe<T>> | Maybe<T>;

type DBReceipt = Receipt & { id: number };

export interface PageArgs {
  first?: number | undefined | null;
  last?: number | undefined | null;
  skip?: number | undefined | null;
}

export interface BlockDAO {
  blockByHeight(args: { height: number }): MaybeAsync<Block>;

  blockByHash(args: { txHash: Hash }): MaybeAsync<Block>;

  blocks(args: { pageArgs: PageArgs }): Promise<Block[]>;
}

export interface TransactionDAO {
  transactionByTxHash(args: { txHash: Hash }): MaybeAsync<Transaction>;

  transactions(args: { pageArgs: PageArgs }): Promise<Transaction[]>;

  transactionsByBlockHeight(args: {
    blockHeight: number;
    pageArgs: PageArgs;
  }): Promise<Transaction[]>;
}

export interface ReceiptDAO {
  receiptByTxHash(args: { txHash: Hash }): MaybeAsync<DBReceipt>;
}

interface ValidatorDAO {
  validatorsByVersion(args: { version: Uint64 }): Promise<Validator[]>;
}

export interface DAO {
  block: BlockDAO;
  transaction: TransactionDAO;
  receipt: ReceiptDAO;
  validator: ValidatorDAO;
}
