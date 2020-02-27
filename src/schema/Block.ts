import { objectType } from 'nexus';

export const Block = objectType({
  name: 'Block',
  definition(t) {
    t.model.height();
    t.int('height', { description: 'Block height' });

    t.model.blockHash();
    t.field('blockHash', {
      type: 'Hash',
      description: 'The current block hash',
    });

    t.model.transactionsCount();
    t.int('transactionsCount', {
      description: 'Show how many transactions in the block',
    });

    t.model.preHash();
    t.field('preHash', { type: 'Hash', description: 'The prev block hash' });

    t.model.timestamp();
    t.field('timestamp', {
      type: 'DateTime',
      description: "A datetime string format as yyyy-MM-dd'T'HH:mm:ss.SSSZ",
    });

    t.model.proposer();
    t.field('proposer', {
      type: 'Address',
      description: 'The address of the proposer of a block',
    });

    t.model.orderRoot();
    t.field('orderRoot', {
      type: 'Hash',
      description: 'The ordered transactions Merkle root of a block',
    });

    t.model.stateRoot();
    t.field('stateRoot', {
      type: 'Hash',
      description: 'The Merkle root of state root',
    });

    t.model.proofBitmap();
    t.field('proofBitmap', {
      type: 'Bytes',
      description: 'The proof of a bitmap',
    });

    t.model.proofBlockHash();
    t.field('proofBlockHash', {
      type: 'Hash',
      description: 'The proof of prev block hash, same as prevBlockHash',
    });

    t.model.proofRound();
    t.field('proofRound', {
      type: 'Uint64',
      description: 'Proof of round',
    });

    t.model.proofSignature();
    t.field('proofSignature', {
      type: 'Bytes',
      description: 'The proof of a signature for a block',
    });

    t.model.validatorVersion();
    t.field('validatorVersion', {
      type: 'Uint64',
      description: 'The version of validators',
    });

    t.model.validators();
    t.model.transactions();
  },
});
