import { objectType, queryField } from 'nexus';

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
      type: 'Asset',
      resolve() {
        return { assetId: '', symbol: '', supply: '', name: '' };
      },
    });
  },
});


