import { knex } from '@hermit/impl/db/mysql';
import { ASSET, BALANCE, TRANSFER } from '@hermit/impl/db/mysql/constants';
import { downBuilder, upBuilder } from '@hermit/migration/mysql/001-init';

export const up = () => {
  return upBuilder(knex)
    .createTable(ASSET, table => {
      table.specificType('account', 'varchar(40) NOT NULL');
      table.specificType('assetId', 'varchar(64) NOT NULL');
      table.text('name').notNullable();
      table.specificType('supply', 'varchar(16) NOT NULL');
      table.text('symbol').notNullable();
      table.specificType('txHash', 'varchar(64) NOT NULL');
    })
    .createTable(TRANSFER, table => {
      table.specificType('asset', 'varchar(64) NOT NULL').index();

      table.specificType('from', 'varchar(40) NOT NULL').index();

      table.bigIncrements('id').primary();

      table.specificType('to', 'varchar(40) NOT NULL').index();

      table
        .specificType('txHash', 'varchar(64) NOT NULL')
        .index()
        .unique();

      table
        .specificType('value', 'varchar(16) NOT NULL')
        .comment('transfer amount');

      table
        .integer('block')
        .index()
        .notNullable()
        .comment('The block height');

      table
        .specificType('timestamp', 'varchar(16) NOT NULL')
        .comment('Block timestamp');
    })
    .createTable(BALANCE, table => {
      table.specificType('account', 'varchar(40) NOT NULL').index();
      table.specificType('asset', 'varchar(64) NOT NULL').index();
      table.specificType('balance', 'varchar(16) NOT NULL');
      table.bigIncrements('id').primary();
      table.unique(['account', 'asset']);
    });
};

export const down = () => {
  return downBuilder(knex)
    .dropTableIfExists(ASSET)
    .dropTableIfExists(TRANSFER)
    .dropTableIfExists(BALANCE);
};
