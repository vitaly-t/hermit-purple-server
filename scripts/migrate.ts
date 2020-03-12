import { join } from 'path';

const [, , dbType, version, operation] = process.argv as [
  string,
  string,
  'mysql',
  '001',
  ('up' | 'down')?,
];

async function main() {
  if (!dbType || !version) {
    console.error('Wrong usage');
  }
  const migrate = require(join(
    __dirname,
    `../src/impl/db/${dbType}/migration/${version}`,
  ));

  if (operation) {
    await migrate[operation]();
    console.log(`migrate ${dbType} ${version} ${operation} success`);
    process.exit(0);
  }

  console.log(migrate.up().toQuery());
}

main();
