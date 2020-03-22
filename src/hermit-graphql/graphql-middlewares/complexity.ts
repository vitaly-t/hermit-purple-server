// calc the complexity of an query request
// error when the complexity great than `HERMIT_MAX_COMPLEXITY`

import { Request } from 'express';
import { GraphQLError, ValidationContext } from 'graphql';
import { getComplexity } from 'graphql-query-complexity';

interface Option {
  // name of list fields
  fields: string[];
  // max skip size
  maxSkipSize: number;
  // max row * column
  maxFieldSize: number;
}

export function createListLimitationValidator(options: Option) {
  const { fields, maxSkipSize, maxFieldSize } = options;

  const limitationFields = new Set(fields);

  return function complexity(context: ValidationContext, request?: Request) {
    const complexity = getComplexity({
      query: context.getDocument(),
      schema: context.getSchema(),
      variables: request?.body.variables,
      estimators: [
        options => {
          const fieldName = options.field.name;
          const limit = options.args.first || options.args.last;
          const skip = options.args.skip ?? 0;

          if (skip > maxSkipSize) {
            context.reportError(
              new GraphQLError(
                `The maximum skip size is ${maxSkipSize}, ` +
                  `skip ${skip} "${fieldName}" is not allowed`,
              ),
            );
          }

          if (limitationFields.has(fieldName) && !limit) {
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

    if (complexity > maxFieldSize) {
      context.reportError(
        new GraphQLError(
          `The query exceeds the maximum cost of ${maxFieldSize}. ` +
            `Actual cost is ${complexity}`,
        ),
      );
    }

    return context.getErrors().length === 0;
  };
}
