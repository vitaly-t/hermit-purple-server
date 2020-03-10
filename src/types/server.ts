import { Hash } from 'muta-sdk/build/main/types/scalar';
import { Block, Receipt, Transaction } from './model';

export interface BlockDAO {
  byHeight(height: number): Promise<Block | undefined>;

  byHash(hash: Hash): Promise<Block | undefined>;
}

export interface TransactionDAO {
  byTxHash(hash: Hash): Promise<Transaction | undefined>;

  byBlockHeight(height: number): Promise<Transaction[]>;
}

export interface ReceiptDAO {
  byTxHash(hash: Hash): Promise<Receipt | undefined>;
}

export interface DAO {
  block: BlockDAO;
  transaction: TransactionDAO;
  receipt: ReceiptDAO;
}

export interface ServerContext {
  dao: DAO;
}
