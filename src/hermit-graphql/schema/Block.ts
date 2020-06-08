import { pageArgs } from './pagination';
import { arg, objectType, queryField } from 'nexus';

export const Block = objectType({
  name: 'Block',
  definition(t) {
    t.int('height', { description: 'Block height' });

    t.field('blockHash', {
      type: 'Hash',
      description: 'The current block hash',
    });

    t.int('transactionsCount', {
      description: 'Show how many transactions in the block',
    });

    t.field('prevHash', { type: 'Hash', description: 'The prev block hash' });

    t.field('timestamp', { type: 'Timestamp' });

    t.field('proposer', {
      type: 'Address',
      description: 'The address of the proposer of a block',
    });

    t.field('orderRoot', {
      type: 'Hash',
      description: 'The ordered transactions Merkle root of a block',
    });

    t.field('stateRoot', {
      type: 'Hash',
      description: 'The Merkle root of state root',
    });

    t.field('proofBitmap', {
      type: 'Bytes',
      description: 'The proof of a bitmap',
    });

    t.field('proofRound', {
      type: 'Uint64',
      description: 'Proof of round',
    });

    t.field('proofSignature', {
      type: 'Bytes',
      description: 'The proof of a signature for a block',
    });

    t.field('validatorVersion', {
      type: 'Uint64',
      description: 'The version of validators',
    });

    t.list.field('validators', {
      type: 'Validator',
      resolve(parent, args, ctx) {
        return ctx.dao.validator.validatorsByVersion({
          version: parent.validatorVersion,
        });
      },
    });
  },
});

export const blockQuery = queryField(t => {
  t.field('block', {
    type: Block,
    args: {
      hash: arg({ type: 'Hash' }),
      height: arg({ type: 'Int' }),
    },
    nullable: true,
    async resolve(parent, args, ctx) {
      const { hash, height } = args;
      const block = ctx.dao.block;

      if (hash) {
        return (await block.blockByHash({ txHash: hash })) ?? null;
      } else if (height) {
        return (await block.blockByHeight({ height })) ?? null;
      }
      return null;
    },
  });
});

export const blocksPagination = queryField(t => {
  t.list.field('blocks', {
    type: 'Block',
    args: {
      ...pageArgs,
    },
    resolve(parent, args, ctx) {
      return ctx.dao.block.blocks({ pageArgs: args });
    },
  });
});
