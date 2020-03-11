import { Hash, Uint64 } from 'muta-sdk/build/main/types/scalar';
import { Block, Receipt, Transaction, Validator } from './model';

export type Maybe<T> = T | null;

export type MaybeAsync<T> = Promise<Maybe<T>> | Maybe<T>;

export interface PageArgs {
  first?: number | undefined | null;
  last?: number | undefined | null;
  skip?: number | undefined | null;
}

export interface BlockDAO {
  blockByHeight(args: { height: number }): MaybeAsync<Block>;

  blockByHash(args: { hash: Hash }): MaybeAsync<Block>;

  blocks(args: { pageArgs: PageArgs }): Promise<Block[]>;
}

export interface TransactionDAO {
  byTxHash(args: { txHash: Hash }): MaybeAsync<Transaction>;

  byBlockHeight(args: { blockHeight: number }): Promise<Transaction[]>;
}

export interface ReceiptDAO {
  receiptByTxHash(args: { txHash: Hash }): MaybeAsync<Receipt>;
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
