#!/usr/bin/env node
import { createVersionedCommander } from '@muta-extra/common';
import { Migration1591797537928 } from '../migration/Migration1591797537928';

async function runMigration(cmd: string) {
  if (!cmd.startsWith('migration')) {
    console.error(`try to run migration`);
    return;
  }

  // TODO migration should not be hardcode
  const migration = new Migration1591797537928();
  if (cmd === 'migration:up') {
    await migration.up();
    console.log('tables are crated');
    return;
  } else if (cmd === 'migration:down') {
    await migration.down();
    console.log('tables are dropped');
    return;
  }

  console.log(migration.up().toString());
}

const program = createVersionedCommander();

program
  .command('run <command>')
  .action(cmd => runMigration(cmd).then(() => process.exit()));
program.parse(process.argv);
