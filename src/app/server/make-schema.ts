import { nexusTypes } from '@hermit/hermit-graphql';
import { makeSchema } from 'nexus';
import { resolveGenerated } from '../utils';

export const schema = makeSchema({
  types: {
    ...nexusTypes,
  },
  outputs: {
    schema: resolveGenerated('schema.graphql'),
    typegen: resolveGenerated('nexus.d.ts'),
  },
  typegenAutoConfig: {
    contextType: 'ctx.ServerContext',
    backingTypeMap: {
      Address: 'string',
      Bytes: 'string',
      Hash: 'string',
      Uint64: 'string',
    },
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'ctx',
      },
      {
        // resolve sql types to typescript types
        source: require.resolve('../../db-mysql/types'),
        alias: 'db',
      },
    ],
  },
});
