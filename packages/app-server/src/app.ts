import { envNum } from '@muta-extra/common';
import { DefaultService } from '@muta-extra/knex-mysql';
import { makeSchema, schemas as types } from '@muta-extra/nexus-schema';
import { ApolloServer } from 'apollo-server';
import path from 'path';

const schema = makeSchema({
  types,
  outputs: {
    schema: path.join(__dirname, '../api.graphql'),
  },
});

const services = new DefaultService();

const server = new ApolloServer({
  schema,
  context: { ...services },
});

const port = envNum('HERMIT_PORT', 4040);

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  ),
);
