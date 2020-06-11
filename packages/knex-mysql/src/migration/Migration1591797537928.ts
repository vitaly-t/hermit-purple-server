import Knex from 'knex';
import { knex as defaultKnex, TableNames } from '../';

export class Migration1591797537928 {
  constructor(private knex: Knex = defaultKnex) {}

  up() {
    return this.knex.schema
      .createTable(TableNames.BLOCK, table => {
        table
          .integer('height')
          .primary()
          .comment('The block height');

        table
          .integer('execHeight')
          .notNullable()
          .comment('The executed block height');

        table
          .specificType('blockHash', 'varchar(66) NOT NULL UNIQUE')
          .comment('The block hash');

        table
          .specificType('orderRoot', 'varchar(66) NOT NULL')
          .comment('Merkle root of ordered transactions');

        table
          .specificType('prevHash', 'varchar(66) NOT NULL')
          .comment('Prev block hash');

        table
          .text('proofBitmap')
          .comment('Proofed bitmap')
          .notNullable();

        table
          .specificType('proofRound', 'varchar(18) NOT NULL')
          .comment('Round usage');

        table
          .specificType('proofSignature', 'varchar(2050) NOT NULL')
          .comment('Aggregated signature of validator set');

        table
          .specificType('proposer', 'varchar(42) NOT NULL')
          .comment('Address of the proposer');

        table
          .specificType('stateRoot', 'varchar(66) NOT NULL')
          .comment('State merkle root of the block');

        table
          .specificType('timestamp', 'varchar(18) NOT NULL')
          .comment('Block timestamp');

        table
          .integer('transactionsCount')
          .notNullable()
          .comment('Number of transactions in the block');

        table
          .specificType('validatorVersion', 'varchar(18) NOT NULL')
          .comment(
            'When the attributes of the validator set or the validator set change, ' +
              'the validatorVersion will change together',
          );
      })
      .createTable(TableNames.TRANSACTION, table => {
        table
          .integer('block')
          .index()
          .notNullable();

        table.specificType('chainId', 'varchar(66) NOT NULL');

        table.specificType('cyclesLimit', 'varchar(18) NOT NULL');

        table.specificType('cyclesPrice', 'varchar(18) NOT NULL');

        table.specificType('from', 'varchar(42) NOT NULL');

        table.specificType('method', 'varchar(255) NOT NULL');

        table.specificType('nonce', 'varchar(66) NOT NULL');

        table.bigIncrements('order').primary();

        table.specificType('payload', 'LONGTEXT NOT NULL');

        table.specificType('pubkey', 'varchar(68) NOT NULL');

        table.specificType('serviceName', 'varchar(255) NOT NULL');

        table.specificType('signature', 'varchar(130) NOT NULL');

        table.specificType('timeout', 'varchar(18) NOT NULL');

        table.specificType('txHash', 'varchar(66) NOT NULL').index();
      })
      .createTable(TableNames.RECEIPT, table => {
        table.bigIncrements('id').primary();

        table.integer('block').notNullable();

        table.specificType('cyclesUsed', 'varchar(18) NOT NULL');

        table.boolean('isError').notNullable();

        table.text('ret').notNullable();

        table.specificType('txHash', 'varchar(66) NOT NULL').unique();
      })
      .createTable(TableNames.EVENT, table => {
        table.text('data').notNullable();

        table.bigIncrements('id').primary();

        table.specificType('txHash', 'varchar(66) NOT NULL');

        table.specificType('service', 'varchar(255) NOT NULL');
      })
      .createTable(TableNames.BLOCK_VALIDATOR, table => {
        table.increments('id');

        table.specificType('address', 'varchar(42) NOT NULL');

        table.integer('proposeWeight').notNullable();

        table
          .specificType('version', 'varchar(18) NOT NULL')
          .comment('This field will change when the validator changes');

        table.integer('voteWeight').notNullable();

        table.unique(['address', 'version']);
      })
      .createTable(TableNames.ACCOUNT, table => {
        table.specificType('address', 'varchar(42) NOT NULL').primary();
      });
  }

  down() {
    return this.knex.schema
      .dropTableIfExists(TableNames.BLOCK)
      .dropTableIfExists(TableNames.TRANSACTION)
      .dropTableIfExists(TableNames.RECEIPT)
      .dropTableIfExists(TableNames.EVENT)
      .dropTableIfExists(TableNames.BLOCK_VALIDATOR)
      .dropTableIfExists(TableNames.ACCOUNT);
  }
}
