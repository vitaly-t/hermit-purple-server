import {
  BLOCK,
  BLOCK_VALIDATOR,
  RECEIPT,
  TRANSACTION,
} from '@hermit/db-mysql/constants';
import { knex } from '@hermit/db-mysql/index';
import { findMany, findOne } from '../db-mysql/knex-helper';
import { DAO } from '../hermit-types/server';
import { Block, BlockValidator, Receipt, Transaction } from './types';

export const MySQLDAO: DAO = {
  block: {
    async blockByHash({ txHash }) {
      return findOne<Block>(knex, BLOCK, { blockHash: txHash });
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
    async transactionsByBlockHeight({ blockHeight }) {
      return findMany<Transaction>(knex, TRANSACTION, {
        where: { block: blockHeight },
        orderBy: ['order', 'desc'],
      });
    },
    async transactionByTxHash({ txHash }) {
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
