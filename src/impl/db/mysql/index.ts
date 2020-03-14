import { HERMIT_DATABASE_URL } from '@hermit/config';
import {
  Block,
  BlockValidator,
  Receipt,
  Transaction,
} from '@hermit/generated/schema';
import {
  BLOCK,
  BLOCK_VALIDATOR,
  RECEIPT,
  TRANSACTION,
} from '@hermit/impl/db/mysql/constants';
import { findMany, findOne } from '@hermit/plugins/knex';
import { DAO } from '@hermit/types/server';
import * as Knex from 'knex';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';

export const knex = Knex({
  client: 'mysql',
  connection: HERMIT_DATABASE_URL,
});

attachOnDuplicateUpdate();

export const MySQLDAO: DAO = {
  block: {
    async blockByHash({ hash }) {
      return findOne<Block>(knex, BLOCK, { blockHash: hash });
    },
    async blockByHeight({ height }) {
      return findOne<Block>(knex, BLOCK, { height });
    },

    async blocks({ pageArgs }) {
      return findMany<Block>(knex, BLOCK, {
        orderBy: ['height', 'desc'],
        page: pageArgs,
      });
    },
  },
  receipt: {
    async receiptByTxHash({ txHash }) {
      return findOne<Receipt>(knex, RECEIPT, { txHash });
    },
  },
  transaction: {
    async byBlockHeight({ blockHeight }) {
      return findMany<Transaction>(knex, TRANSACTION, {
        where: { block: blockHeight },
        orderBy: ['order', 'desc'],
      });
    },
    async byTxHash({ txHash }) {
      return findOne<Transaction>(knex, TRANSACTION, { txHash });
    },
  },
  validator: {
    async validatorsByVersion({ version }) {
      return findMany<BlockValidator>(knex, BLOCK_VALIDATOR, {
        where: { version },
      });
    },
  },
};
