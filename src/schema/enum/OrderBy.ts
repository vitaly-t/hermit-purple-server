import { enumType } from 'nexus';

export const OrderByEnum = enumType({
  name: 'OrderByEnum',
  members: ['asc', 'desc'],
});
