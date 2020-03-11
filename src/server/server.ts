import { GraphQLError } from 'graphql';
import { GraphQLServer, Options } from 'graphql-yoga';
import { defaultErrorFormatter } from 'graphql-yoga/dist/defaultErrorFormatter';
import * as proxy from 'http-proxy-middleware';
import * as cors from 'cors';
import { createContext } from '../impl/server/Context';
import { schema } from './schema';
import { HERMIT_CORS_ORIGIN, HERMIT_PORT, MUTA_ENDPOINT } from '../config';
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

if (process.env.NODE_ENV !== 'development') {
  server.use(function(err, req, res, next) {
    if (err) {
      res.status(500).send('Oops');
      return;
    }
    next();
  });
}

const options: Options = {
  formatError(error: GraphQLError) {
    if (error.originalError) {
      return 'Unknown error';
    }
    return defaultErrorFormatter(error);
  },
  port: HERMIT_PORT,
  validationRules: req => [context => complexity(context, req)],
  ...(HERMIT_CORS_ORIGIN
    ? { cors: { origin: HERMIT_CORS_ORIGIN } }
    : { cors: false }),
};

server.start(options, () =>
  console.log(`🚀 Server ready at: http://127.0.0.1:${HERMIT_PORT}`),
);
