import { envStr } from '@muta-extra/common';
import { ConnectionString } from 'connection-string';
import Knex, { MySqlConnectionConfig } from 'knex';
import 'knex-on-duplicate-update';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';

attachOnDuplicateUpdate();

let defaultKnex: Knex;

export function getKnexInstance(
  connection: string = envStr('HERMIT_DATABASE_URL', ''),
) {
  if (!defaultKnex) {
    const conn = new ConnectionString(connection);
    const mySqlConfig: MySqlConnectionConfig = {
      host: conn.hostname,
      user: conn.user,
      password: conn.password,
      database: conn.path?.[0],
      ...(conn.params ?? {}),
    };

    defaultKnex = Knex({ client: 'mysql', connection: mySqlConfig });

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
