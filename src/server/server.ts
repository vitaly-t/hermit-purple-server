import { GraphQLError } from 'graphql';
import { GraphQLServer, Options } from 'graphql-yoga';
import { defaultErrorFormatter } from 'graphql-yoga/dist/defaultErrorFormatter';
import * as proxy from 'http-proxy-middleware';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
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

const chain_proxy = proxy({
  target: MUTA_ENDPOINT,
  changeOrigin: true,
  pathRewrite: {
    '^/chain': '',
  },
  onProxyReq: (proxyReq, req, res) => {
    try {
      const transferQuery = `mutation sendTransaction($inputRaw: InputRawTransaction!, $inputEncryption: InputTransactionEncryption!) {\n  sendTransaction(inputRaw: $inputRaw, inputEncryption: $inputEncryption)\n}\n`;
      // @ts-ignore
      const inputRaw = req.body.variables.inputRaw;
      if (
        // @ts-ignore
        req.body.query !== transferQuery ||
        inputRaw.serviceName !== 'asset' ||
        inputRaw.method !== 'transfer'
      ) {
        throw 'only transfer method supported';
      }
    } catch (err) {
      // @ts-ignore
      res.status(400).end(`invalid query. err: ${err}`);
      return;
    }
    // @ts-ignore
    if (req.body) {
      // @ts-ignore
      const bodyData = JSON.stringify(req.body);
      proxyReq.setHeader('Content-Type', 'application/json');
      proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
      proxyReq.write(bodyData);
    }
  },
});

server.express.use('/chain', bodyParser.json()).use('/chain', chain_proxy);

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
    if (error.originalError && !(error.originalError instanceof GraphQLError)) {
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
