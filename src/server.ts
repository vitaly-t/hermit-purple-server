import { GraphQLServer, Options } from 'graphql-yoga';
import * as proxy from 'http-proxy-middleware';
import * as cors from 'cors';
import { schema } from './schema';
import { createContext } from './context';
import { ALLOW_CORS, HERMIT_PORT, MUTA_ENDPOINT } from './config';
import { complexity } from './rules/complexity';

const server = new GraphQLServer({
  schema,
  context: createContext,
});

if (ALLOW_CORS) {
  server.express.use(cors({ origin: '*' }));
}
server.express.use(
  '/chain',
  proxy({
    target: MUTA_ENDPOINT,
    changeOrigin: true,
    pathRewrite: {
      '^/chain': '',
    },
  }),
);

const options: Options = {
  port: HERMIT_PORT,
  validationRules: req => [context => complexity(context, req)],
};

if (ALLOW_CORS) {
  options.cors = {
    origin: '*',
  };
}

server.start(options, () =>
  console.log(`🚀 Server ready at: http://localhost:${HERMIT_PORT}`),
);
