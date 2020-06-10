import { objectType } from '@nexus/schema';

export const Receipt = objectType({
  name: 'Receipt',
  definition(t) {
    t.boolean('isError', {
      nullable: true,
      description: 'True when transaction receipt is error ',
    });

    t.string('ret', {
      nullable: true,
      description: 'Transaction response, is often a string in json format',
    } as any);

    t.field('cyclesUsed', {
      type: 'Uint64',
      description: 'Cycles used, similar to the `gasUsed` in eth',
    });
  },
});
