import { objectType } from 'nexus';

export const Validator = objectType({
  name: 'Validator',
  definition(t) {
    t.model.address();
    t.field('address', { type: 'Address', description: 'A validator address' });

    t.model.proposeWeight();
    t.int('proposeWeight', { description: 'Propose weight of a validator' });

    t.model.voteWeight();
    t.int('voteWeight', { description: 'Vote weight of a validator' });

    t.model.blocks();
  },
});
