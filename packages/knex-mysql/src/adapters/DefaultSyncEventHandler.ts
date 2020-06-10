import { BlockModel, logger } from '@muta-extra/common';
import { ISyncEventHandlerAdapter } from '@muta-extra/synchronizer';
import Knex from 'knex';
import { knex, TableNames } from '../';

const debug = logger.childLogger('sync:debug');

export class DefaultSyncEventHandler implements ISyncEventHandlerAdapter {
  constructor(private knex: Knex = knex) {}

  async onGenesis() {}

  async onBlockPackaged(): Promise<void> {}

  async onBlockExecuted(executed): Promise<void> {
    await this.knex.transaction(async trx => {
      await trx<BlockModel>(TableNames.BLOCK).insert(executed.getBlock());
      const transactions = executed.getTransactions();
      const receipts = executed.getReceipts();

      await this.knex
        .batchInsert(TableNames.TRANSACTION, transactions)
        .transacting(trx);
      debug(`${transactions.length} transactions prepared`);

      await this.knex
        .batchInsert(TableNames.RECEIPT, receipts)
        .transacting(trx);
      debug(`${receipts.length} receipts prepared`);

      const events = executed.getEvents();
      await this.knex.batchInsert(TableNames.EVENT, events).transacting(trx);
      debug(`${events.length} events prepared`);

      for (let validator of executed.getValidators()) {
        await this.knex
          .insert(validator)
          .into(TableNames.BLOCK_VALIDATOR)
          //@ts-ignore
          .onDuplicateUpdate('address', 'version')
          .transacting(trx);
      }
    });
  }
}
