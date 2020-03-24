import { HERMIT_DATABASE_URL } from '@hermit/hermit-config';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { typescriptOfSchema } from 'schemats';

async function main() {
  const schema = await typescriptOfSchema(
    HERMIT_DATABASE_URL,
    undefined,
    undefined,
    {
      writeHeader: false,
    },
  );
  writeFileSync(join(__dirname, '../types.ts'), `// @ts-nocheck \n${schema}`);
  process.exit(0);
}

main();
