import { BlockModel } from '@muta-extra/common';
import { IFetchLocalAdapter } from '@muta-extra/synchronizer';
import Knex from 'knex';
import { knex, TableNames } from '../';

export class DefaultLocalFetcher implements IFetchLocalAdapter {
  constructor(private knex: Knex = knex) {}

  async getLocalBlockHeight(): Promise<number> {
    const block = await this.knex<BlockModel>(TableNames.BLOCK)
      .select('height')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0]?.height ?? 0;
  }

  async getLocalBlockExecHeight(): Promise<number> {
    const block = await this.knex<BlockModel>(TableNames.BLOCK)
      .select('execHeight')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0].execHeight ?? 0;
  }
}
