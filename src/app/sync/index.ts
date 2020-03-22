import { knex } from '@hermit/db-mysql';
import {
  BLOCK,
  BLOCK_VALIDATOR,
  EVENT,
  RECEIPT,
  TRANSACTION,
} from '@hermit/db-mysql/constants';
import { BlockSynchronizer, Synchronizer } from '@hermit/hermit-sync';
import { Block } from '@hermit/hermit-types/model';

const debug = require('debug')('sync:debug');

const syncAdapter: Synchronizer = {
  async getLocalBlockHeight(): Promise<number> {
    const block = await knex<Block>(BLOCK)
      .select('height')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0]?.height ?? 0;
  },

  async getLocalBlockExecHeight(): Promise<number> {
    const block = await knex<Block>(BLOCK)
      .select('execHeight')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0].execHeight ?? 0;
  },

  async onGenesis() {},

  async onBlockPacked(): Promise<void> {},

  async onBlockExecuted(executed): Promise<void> {
    await knex.transaction(async trx => {
      await trx<Block>(BLOCK).insert(executed.getBlock());
      const transactions = executed.getTransactions();
      const receipts = executed.getReceipts();

      await knex.batchInsert(TRANSACTION, transactions).transacting(trx);
      debug(`${transactions.length} transactions prepared`);

      await knex.batchInsert(RECEIPT, receipts).transacting(trx);
      debug(`${receipts.length} receipts prepared`);

      const events = executed.getEvents();
      await knex.batchInsert(EVENT, events).transacting(trx);
      debug(`${events.length} events prepared`);

      for (let validator of executed.getValidators()) {
        await knex
          .insert(validator)
          .into(BLOCK_VALIDATOR)
          .onDuplicateUpdate('address', 'version')
          .transacting(trx);
      }
    });
  },
};

new BlockSynchronizer(syncAdapter).run();
