import { pageArgs } from '@hermit/server/common/pagination';
import { objectType, queryField } from 'nexus';

export const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.field('assetId', { type: 'Hash' });

    t.string('name', { description: 'The **full** name of this asset' });

    t.string('symbol', { description: 'The **short** name of this asset' });

    t.field('supply', { type: 'Uint64' });

    t.field('issuer', {
      type: 'Address',
      resolve(parent) {
        return parent.account;
      },
    });
  },
});

export const assetsPagination = queryField(t => {
  t.list.field('assets', {
    type: 'Asset',
    args: pageArgs,
    resolve() {
      return [];
    },
  });
});
