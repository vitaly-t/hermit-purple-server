import { makeSchema } from 'nexus';
import { nexusTypes } from '@hermit/hermit-graphql';
import { resolveGenerated, resolveSrc } from '../utils';

export const schema = makeSchema({
  types: {
    ...nexusTypes,
  },
  outputs: {
    schema: resolveGenerated('schema.graphql'),
    typegen: resolveGenerated('nexus.ts'),
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
        source: require.resolve(__dirname + '/context.ts'),
        alias: 'ctx',
      },
      {
        // resolve sql types to typescript types
        source: resolveSrc('db-mysql/types.ts'),
        alias: 'db',
      },
    ],
  },
});
