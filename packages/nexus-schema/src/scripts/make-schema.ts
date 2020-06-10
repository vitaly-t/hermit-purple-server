import { makeSchema } from '@nexus/schema';
import { join } from 'path';
import * as types from '../schema';

makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, '../generated/typings.ts'),
  },
  typegenAutoConfig: {
    contextType: 'ctx.IService',
    backingTypeMap: {
      Address: 'string',
      Bytes: 'string',
      Hash: 'string',
      Uint64: 'string',
    },
    sources: [
      {
        source: require.resolve('../service'),
        alias: 'ctx',
      },
    ],
  },
});
