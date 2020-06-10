import { objectType } from '@nexus/schema';

export const Validator = objectType({
  name: 'Validator',
  definition(t) {
    t.field('address', { type: 'Address', description: 'A validator address' });

    t.int('proposeWeight', { description: 'Propose weight of a validator' });

    t.int('voteWeight', { description: 'Vote weight of a validator' });
  },
});
