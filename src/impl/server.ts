import { ServerContext } from '@hermit/types/server';
import { MySQLDAO } from './db/mysql';

export function createContext(): ServerContext {
  return {
    dao: MySQLDAO,
  };
}
