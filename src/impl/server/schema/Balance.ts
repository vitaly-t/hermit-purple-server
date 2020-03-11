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
      type: 'Account',
      resolve() {
        return { address: '' };
      },
    });

    t.field('asset', {
      type: 'Hash',
    });
  },
});

export const balancePagination = queryField(t => {
  t.list.field('balances', {
    type: 'Balance',
    args: {
      ...pageArgs,
      assetId: arg({ type: 'Hash' }),
      address: arg({ type: 'Address' }),
    },
    resolve() {
      return [];
    },
  });
});
