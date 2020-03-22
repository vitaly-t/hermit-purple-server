import { createListLimitationValidator } from '@hermit/hermit-graphql/graphql-middlewares/complexity';
import { GraphQLError } from 'graphql';
import { GraphQLServer, Options } from 'graphql-yoga';
import { defaultErrorFormatter } from 'graphql-yoga/dist/defaultErrorFormatter';
import {
  HERMIT_CORS_ORIGIN,
  HERMIT_MAX_COMPLEXITY,
  HERMIT_MAX_SKIP_SIZE,
  HERMIT_PORT,
} from '@hermit/hermit-config';
import { context } from './context';
import { schema } from './make-schema';

const validateListLimitation = createListLimitationValidator({
  fields: ['blocks', 'transactions', 'accounts'],
  maxFieldSize: HERMIT_MAX_COMPLEXITY,
  maxSkipSize: HERMIT_MAX_SKIP_SIZE,
});

const server = new GraphQLServer({
  schema,
  context,
});

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
  validationRules: req => [context => validateListLimitation(context, req)],
  ...(HERMIT_CORS_ORIGIN
    ? { cors: { origin: HERMIT_CORS_ORIGIN } }
    : { cors: false }),
};

server.start(options, () =>
  console.log(`🚀 Server ready at: http://127.0.0.1:${HERMIT_PORT}`),
);
