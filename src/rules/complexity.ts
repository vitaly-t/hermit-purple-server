import { getComplexity } from 'graphql-query-complexity';
import { ValidationContext, GraphQLError } from 'graphql';
import { HERMIT_MAX_COMPLEXITY } from '../config';
import { Request } from 'express';

const MUST_LIMIT_TYPE = new Set([
  'blocks',
  'transactions',
  'account',
  'assets',
  'accountTransfers',
]);

export function complexity(context: ValidationContext, request?: Request) {
  const complexity = getComplexity({
    query: context.getDocument(),
    schema: context.getSchema(),
    variables: request?.body.variables,
    estimators: [
      options => {
        const fieldName = options.field.name;
        const limit = options.args.first || options.args.last;

        if (MUST_LIMIT_TYPE.has(fieldName) && !limit) {
          context.reportError(
            new GraphQLError(
              `"first" or "last" argument is required in field "${fieldName}" of type "${options.type.name}"`,
            ),
          );
        }

        if (limit) {
          return (options.childComplexity || 1) * limit;
        }
        return options.childComplexity || 1;
      },
    ],
  });

  if (complexity > HERMIT_MAX_COMPLEXITY) {
    context.reportError(
      new GraphQLError(
        `The query exceeds the maximum cost of ${HERMIT_MAX_COMPLEXITY}. ` +
          `Actual cost is ${complexity}`,
      ),
    );
  }

  return context.getErrors().length === 0;
}
