import { objectType } from '@nexus/schema';

export const Account = objectType({
  name: 'Account',
  definition(t) {
    t.field('address', { type: 'Address' });
  },
});
