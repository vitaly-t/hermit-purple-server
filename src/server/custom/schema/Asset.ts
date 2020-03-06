import { objectType, queryField } from 'nexus';

export const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.field('assetId', { type: 'Hash' });

    t.string('name', { description: 'The **full** name of this asset' });

    t.string('symbol', { description: 'The **short** name of this asset' });

    t.field('supply', { type: 'Uint64' });

    t.field('issuer', {
      type: 'Account',
      resolve() {
        return {
          address: '',
        };
      },
    });

    t.field('transaction', {
      type: 'Transaction',
      resolve() {
        return {};
      },
    });

    t.connectionField('transfers', {
      type: 'Transfer',
      nodes() {
        return [];
      },
    });
  },
});

export const assetConnection = queryField(t => {
  t.connectionField('assets', {
    type: 'Asset',
    nodes() {
      return [];
    },
  });
});
