import { pageArgs } from '@hermit/server/common/pagination';
import { objectType, queryField, stringArg } from 'nexus';

export const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.field('assetId', { type: 'Hash' });

    t.string('name', { description: 'The **full** name of this asset' });

    t.string('symbol', { description: 'The **short** name of this asset' });

    t.field('supply', { type: 'Uint64' });

    t.string('amount');

    t.field('issuer', {
      type: 'Address',
      resolve(parent) {
        return parent.account;
      },
    });
  },
});

export const assetQuery = queryField(t => {
  t.field('asset', {
    type: 'Asset',
    nullable: true,
    args: {
      assetId: stringArg({ required: true }),
    },
    resolve(parent, args, ctx) {
      return ctx.dao.asset.assetById({ id: args.assetId });
    },
  });
});

export const assetsPagination = queryField(t => {
  t.list.field('assets', {
    type: 'Asset',
    args: pageArgs,
    resolve(parent, args, ctx) {
      return ctx.dao.asset.assets({ pageArgs: args });
    },
  });
});
