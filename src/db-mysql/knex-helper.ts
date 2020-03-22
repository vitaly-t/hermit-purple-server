import { PageArgs } from '@hermit/hermit-types/server';
import { QueryBuilder } from 'knex';
import { orderBy as _orderBy, pickBy, identity } from 'lodash';
import Knex = require('knex');

export async function findOne<TRecord extends {} = any>(
  knex: Knex,
  tableName: string,
  where: Partial<TRecord>,
) {
  const result = await knex<TRecord>(tableName)
    .where(where)
    .first();
  return result ?? null;
}

export interface FindManyOption<TRecord extends {} = any> {
  page?: PageArgs;
  where?:
    | Partial<TRecord>
    | ((builder: QueryBuilder<TRecord>) => QueryBuilder<TRecord>);
  orderBy?: [keyof TRecord, ('asc' | 'desc')?];
}

export function buildManyQuery<TRecord extends {} = any>(
  knex: Knex,
  tableName: string,
  options: FindManyOption<TRecord>,
) {
  const { where, page, orderBy } = options;
  const { first, last, skip } = page || {};

  const limit = first || last || 10;

  const offset = skip ?? 0;

  let builder = knex<TRecord>(tableName)
    .limit(limit)
    .offset(offset);

  if (where) {
    if (typeof where === 'function') {
      builder = where(builder);
    } else {
      builder = builder.where(pickBy(where, identity));
    }
  }

  const [orderKey, orderOfKey] = orderBy || [];

  if (!orderKey) return builder;

  if (last) {
    builder = builder.orderBy(orderKey, orderOfKey === 'desc' ? 'asc' : 'desc');
  } else {
    builder = builder.orderBy(orderKey, orderOfKey);
  }

  return builder;
}

export async function findMany<TRecord extends {} = any>(
  knex: Knex,
  tableName: string,
  options: FindManyOption<TRecord>,
) {
  const data = await buildManyQuery(knex, tableName, options);

  const orderBy = options.orderBy;
  const [orderKey, orderOfKey] = orderBy || [];

  if (!orderKey) return data;
  return _orderBy(data, orderKey, orderOfKey ?? 'desc');
}
