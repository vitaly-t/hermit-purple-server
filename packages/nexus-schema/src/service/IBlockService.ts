import { BlockModel } from '@muta-extra/common';
import { QueryManyFn, QueryOneFn } from '../types';

export interface IBlockService {
  findByHash: QueryOneFn<BlockModel, string>;

  findByHeight: QueryOneFn<BlockModel, number>;

  filter: QueryManyFn<BlockModel>;
}
