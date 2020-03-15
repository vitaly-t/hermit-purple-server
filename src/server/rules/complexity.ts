// calc the complexity of an query request
// error when the complexity great than `HERMIT_MAX_COMPLEXITY`

import { Request } from 'express';
import { GraphQLError, ValidationContext } from 'graphql';
import { getComplexity } from 'graphql-query-complexity';
import { HERMIT_MAX_COMPLEXITY, HERMIT_MAX_SKIP_SIZE } from '../../config';

const MUST_LIMIT_TYPE = new Set([
  'blocks',
  'transactions',
  'accounts',
  'assets',
  'transfers',
  'balances',
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
        const skip = options.args.skip ?? 0;

        if (skip > HERMIT_MAX_SKIP_SIZE) {
          context.reportError(
            new GraphQLError(
              `The maximum skip size is ${HERMIT_MAX_SKIP_SIZE}, ` +
                `skip ${skip} "${fieldName}" is not allowed`,
            ),
          );
        }

        if (MUST_LIMIT_TYPE.has(fieldName) && !limit) {
          context.reportError(
            new GraphQLError(
              `"first" or "last" argument is required in field` +
                `"${fieldName}" of type "${options.type.name}"`,
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
