import { helper } from '@hermit/impl/helpers/AssetHelper';
import { pageArgs } from '@hermit/server/common/pagination';
import { arg, objectType, queryField } from 'nexus';

export const Balance = objectType({
  name: 'Balance',
  definition(t) {
    t.field('balance', {
      type: 'Uint64',
      description: 'Uint64 balance',
    });

    t.field('account', {
      type: 'Address',
    });

    t.field('asset', {
      type: 'Hash',
    });

    t.string('amount');
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
      const balances = await ctx.dao.balance.balances({
        pageArgs: args,
        where: { address: address! },
      });

      return balances.map(async item => {
        const { value, amount } = await helper.getBalance(
          item.asset,
          item.account,
          true,
        );

        return {
          id: item.id,
          balance: value,
          account: item.account,
          asset: item.asset,
          amount: amount!,
        };
      });
    },
  });
});
