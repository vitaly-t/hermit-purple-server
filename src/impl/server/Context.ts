import { Asset, Balance, Transfer } from '@hermit/generated/schema';
import { ASSET, BALANCE, TRANSFER } from '@hermit/impl/db/mysql/constants';
import { findMany, FindManyOption, findOne } from '@hermit/plugins/knex';
import { DAO, MaybeAsync, PageArgs } from '@hermit/types/server';
import { knex, MySQLDAO } from '../db/mysql';

interface TransferDAO {
  transferByTxHash(args: { txHash: string }): MaybeAsync<Transfer>;
  transfers(args: {
    where: { assetId?: string; fromOrTo?: string; blockHeight?: number };
    pageArgs: PageArgs;
  }): Promise<Transfer[]>;
}

interface BalanceDAO {
  balances(args: {
    where: { address: string };
    pageArgs: PageArgs;
  }): Promise<Balance[]>;
}

interface AssetDAO {
  assetById(args: { id: string }): MaybeAsync<Asset>;

  assets(args: { pageArgs: PageArgs }): Promise<Asset[]>;
}

interface ExtraDAO extends DAO {
  transfer: TransferDAO;
  balance: BalanceDAO;
  asset: AssetDAO;
}

export interface ServerContext {
  dao: ExtraDAO;
}

export const dao: ExtraDAO = {
  ...MySQLDAO,
  transfer: {
    async transferByTxHash({ txHash }) {
      return findOne<Transfer>(knex, TRANSFER, { txHash });
    },
    async transfers(args) {
      const fromOrTo = args.where.fromOrTo;
      const assetId = args.where.assetId;
      const blockHeight = args.where.blockHeight;

      const where: FindManyOption<Transfer>['where'] = fromOrTo
        ? builder => builder.where('from', fromOrTo).orWhere('to', fromOrTo)
        : assetId
        ? { asset: assetId }
        : blockHeight === undefined
        ? {}
        : { block: blockHeight };

      return findMany<Transfer>(knex, TRANSFER, {
        orderBy: ['id', 'desc'],
        page: args.pageArgs,
        where,
      });
    },
  },
  asset: {
    async assetById({ id }) {
      return findOne<Asset>(knex, ASSET, { assetId: id });
    },
    assets({ pageArgs }) {
      return findMany<Asset>(knex, ASSET, {
        page: pageArgs,
        orderBy: ['name', 'asc'],
      });
    },
  },

  balance: {
    balances({ where, pageArgs }) {
      return findMany<Balance>(knex, BALANCE, {
        where: { account: where.address },
        orderBy: ['id', 'desc'],
        page: pageArgs,
      });
    },
  },
};

export function createContext(): ServerContext {
  return { dao };
}
