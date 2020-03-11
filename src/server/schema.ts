import { connectionPlugin, makeSchema } from 'nexus';
import { join } from 'path';
import * as customTypes from '../impl/server/schema/types';
import * as basicTypes from './schema/types';

const outputGraphQLSchema = join(__dirname, '../generated/schema.graphql');
const outputTypegen = join(__dirname, '../generated/nexus.ts');

export const schema = makeSchema({
  types: {
    ...basicTypes,
    ...customTypes,
  },
  plugins: [connectionPlugin()],
  outputs: {
    schema: outputGraphQLSchema,
    typegen: outputTypegen,
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
        source: require.resolve('@hermit/impl/server/Context'),
        alias: 'ctx',
      },
      {
        source: require.resolve('@hermit/generated/schema'),
        alias: 'db',
      },
    ],
  },
});
