import { intArg } from '@nexus/schema';

export const pageArgs = {
  first: intArg(),
  last: intArg(),
  skip: intArg(),
};
