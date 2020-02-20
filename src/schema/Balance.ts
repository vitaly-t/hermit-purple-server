import { objectType } from 'nexus';

export const Balance = objectType({
  name: 'Balance',
  definition(t) {
    t.model.compound();
    t.field('compound', {
      type: 'Hash',
      description:
        'Same as an id field, but produce by keccak256(address+assetId)',
    });
    t.model.balance();
    t.field('balance', {
      type: 'Uint64',
      description: 'Uint64 balance',
    });
    t.model.account();
    t.model.asset();
  },
});
