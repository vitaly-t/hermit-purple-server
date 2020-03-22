import { resolveGenerated } from '@hermit/app/utils';
import { writeFileSync } from 'fs';
import { typescriptOfSchema } from 'schemats';
import { HERMIT_DATABASE_URL } from '../../hermit-config';

async function main() {
  const schema = await typescriptOfSchema(HERMIT_DATABASE_URL);
  writeFileSync(resolveGenerated('schema.ts'), `// @ts-nocheck \n${schema}`);
  process.exit(0);
}

main();
