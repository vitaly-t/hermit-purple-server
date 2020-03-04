import { objectType } from 'nexus';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.address();
    t.field('address', { type: 'Address' });
    t.model.transactions({ filtering: true, pagination: true, ordering: true });
    t.model.balances({ filtering: true, pagination: true, ordering: true });
  },
});
