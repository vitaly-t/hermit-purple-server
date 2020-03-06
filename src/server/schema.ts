import { connectionPlugin, makeSchema } from 'nexus';
import * as basicTypes from './schema/types';
import * as customTypes from './custom/schema/types';

export const schema = makeSchema({
  types: {
    ...basicTypes,
    ...customTypes,
  },
  plugins: [connectionPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
