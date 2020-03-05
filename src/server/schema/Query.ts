import { queryType } from 'nexus';

export const Query = queryType({
  definition(t) {
    t.field('block', {
      type: 'Block',
      resolve() {
        return { height: 1 };
      },
    });
  },
});
