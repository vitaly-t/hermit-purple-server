import { BLOCK, TRANSACTION } from '@hermit/impl/db/mysql/constants';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';
import * as Knex from 'knex';
import { HERMIT_DATABASE_URL } from '@hermit/config';
import { DAO } from '@hermit/types/server';
import { Block, Receipt, Transaction } from '@hermit/types/model';

export const knex = Knex({
  client: 'mysql',
  connection: HERMIT_DATABASE_URL,
});

attachOnDuplicateUpdate();

export const MySQLDAO: DAO = {
  block: {
    async byHash(hash: string): Promise<Block | undefined> {
      return knex<Block>(BLOCK)
        .where({ blockHash: hash })
        .first();
    },
    async byHeight(height: number): Promise<Block | undefined> {
      return knex<Block>(BLOCK)
        .where({ height })
        .first();
    },
  },
  receipt: {
    async byTxHash(txHash: string): Promise<Receipt | undefined> {
      return knex<Receipt>(TRANSACTION)
        .where({ txHash })
        .first();
    },
  },
  transaction: {
    async byBlockHeight(height: number): Promise<Transaction[]> {
      return knex<Transaction>(TRANSACTION).where({ block: height });
    },
    async byTxHash(txHash: string): Promise<Transaction | undefined> {
      return knex<Transaction>(TRANSACTION)
        .where({ txHash })
        .first();
    },
  },
};
