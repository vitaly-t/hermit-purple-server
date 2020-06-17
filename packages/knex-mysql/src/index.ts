import { envStr } from '@muta-extra/common';
import Knex from 'knex';
import 'knex-on-duplicate-update';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';

attachOnDuplicateUpdate();

let defaultKnex: Knex;

export function getKnexInstance(
  connection: Knex.Config['connection'] = envStr('HERMIT_DATABASE_URL', ''),
) {
  if (!defaultKnex) {
    defaultKnex = Knex({
      client: 'mysql',
      connection,
    });

    if (!connection) {
      console.warn(
        'No HERMIT_DATABASE_URL provided, try connect to mysql://127.0.0.1:3306/muta',
      );
    }
  }

  return defaultKnex;
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
export * from './services';
export { Knex };
