import { MySQLDAO } from '@hermit/db-mysql';
import { DAO } from '@hermit/hermit-types/server';

export interface ServerContext {
  dao: DAO;
}

export const context = { dao: MySQLDAO };
