import { HERMIT_DATABASE_URL } from '@hermit/hermit-config';
import Knex from 'knex';
import { attachOnDuplicateUpdate } from 'knex-on-duplicate-update';

attachOnDuplicateUpdate();

export const knex = Knex({
  client: 'mysql',
  connection: HERMIT_DATABASE_URL,
});

export * from './constants';
export { MySQLDAO } from './dao';
export * from './knex-helper';
