import { pageArgs } from '@hermit/server/common/pagination';
import { arg, objectType, queryField } from 'nexus';

export const Transfer = objectType({
  name: 'Transfer',
  definition(t) {
    t.int('id');

    t.int('block');

    t.string('timestamp', {
      description: 'A datetime string format as UTC string',
      async resolve(parent, args, ctx) {
        const block = await ctx.dao.block.byHeight(parent.block);
        return block?.timestamp ?? '';
      },
    });

    // t.field('asset', {
    //   type: 'Asset',
    //   resolve(parent, args, ctx) {
    //
    //     return {};
    //   },
    // });

    t.string('value');

    t.string('txHash');

    t.string('from');
    t.string('to');
  },
});

const transferQuery = queryField(t => {
  t.field('transfer', {
    type: Transfer,
    args: {
      txHash: arg({ type: 'Hash' }),
    },
    nullable: true,
    resolve(parent, args, ctx) {

      return null;
    },
  });
});

export const transferConnection = queryField(t => {
  t.list.field('transfers', {
    type: 'Transfer',
    args: {
      ...pageArgs,
      fromOrTo: arg({
        type: 'Address',
      }),
      asset: arg({
        type: 'Hash',
      }),
      blockHeight: arg({
        type: 'Int',
      }),
    },
    resolve() {
      return [];
    },
  });
});
