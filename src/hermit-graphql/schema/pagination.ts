import { intArg } from 'nexus';

export const pageArgs = {
  first: intArg(),
  last: intArg(),
  skip: intArg(),
};
