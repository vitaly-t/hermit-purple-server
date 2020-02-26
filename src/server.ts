import { GraphQLServer, Options } from 'graphql-yoga';
import * as proxy from 'http-proxy-middleware';
import * as cors from 'cors';
import { schema } from './schema';
import { createContext } from './context';
import { HERMIT_CORS_ORIGIN, HERMIT_PORT, MUTA_ENDPOINT } from './config';
import { complexity } from './rules/complexity';

const server = new GraphQLServer({
  schema,
  context: createContext,
});

if (HERMIT_CORS_ORIGIN) {
  server.express.use(cors({ origin: HERMIT_CORS_ORIGIN }));
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
  ...(HERMIT_CORS_ORIGIN ? { origin: HERMIT_CORS_ORIGIN } : {}),
};

server.start(options, () =>
  console.log(`🚀 Server ready at: http://127.0.0.1:${HERMIT_PORT}`),
);
