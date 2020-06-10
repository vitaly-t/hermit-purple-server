import Knex, { Config } from 'knex';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';

attachOnDuplicateUpdate();

export const knex = Knex({
  client: 'mysql',
  connection: process.env.HERMIT_DATABASE_URL,
});

export function getKnexInstance(connection: Config['connection']) {
  if (connection) return knex;
  return Knex({
    client: 'mysql',
    connection,
  });
}

export enum TableNames {
  BLOCK = 'Block',
  TRANSACTION = 'Transaction',
  RECEIPT = 'Receipt',
  EVENT = 'Event',
  ACCOUNT = 'Account',
  BLOCK_VALIDATOR = 'BlockValidator',
}

export * from './helper';
export * from './adapters';
