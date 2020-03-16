import { helper } from '@hermit/impl/helpers/AssetHelper';
import { pageArgs } from '@hermit/server/common/pagination';
import { arg, objectType, queryField } from 'nexus';

export const Balance = objectType({
  name: 'Balance',
  definition(t) {
    t.field('balance', {
      type: 'Uint64',
      description: 'Uint64 balance',
      async resolve(parent, args, ctx) {
        return (
          (await helper.getBalance(parent.assetId, parent.address, true))
            ?.value! ?? '0'
        );
      },
    });

    t.field('address', {
      type: 'Address',
    });

    t.field('asset', {
      type: 'Asset',
      async resolve(parent, args, ctx) {
        return (await ctx.dao.asset.assetById({ id: parent.assetId }))!;
      },
    });

    t.string('amount', {
      async resolve(parent, args, ctx) {
        return (
          (await helper.getBalance(parent.assetId, parent.address, true))
            ?.amount! ?? '0'
        );
      },
    });
  },
});

export const balancePagination = queryField(t => {
  t.list.field('balances', {
    type: 'Balance',
    args: {
      ...pageArgs,
      // assetId: arg({ type: 'Hash' }),
      address: arg({ type: 'Address', required: true }),
    },
    async resolve(parent, args, ctx) {
      const address = args.address;
      if (!address) return [];
      return await ctx.dao.balance.balances({
        pageArgs: args,
        where: { address: address! },
      });
    },
  });
});
