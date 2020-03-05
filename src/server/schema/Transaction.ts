import { objectType } from 'nexus';

// export const ResolvedTransaction = unionType({
//   name: 'ResolvedTransaction',
//   definition(t): void {
//     t.members('AssetTransfer', 'Asset');
//   },
// });

export const Transaction = objectType({
  name: 'Transaction',
  definition(t) {
    t.int('order', {
      description: 'The transaction order number of all transactions ',
    });

    t.field('txHash', {
      type: 'Hash',
      description: 'The transaction hash',
    });

    t.string('serviceName', {
      description: 'Represents what `service` does the transaction called ',
    });

    t.string('method', {
      description: 'Represents what `method` does the transaction called ',
    });

    t.string('payload', {
      description: 'Represents what `payload` of the transaction called method',
    });

    t.boolean('receiptIsError', {
      nullable: true,
      description: 'True when transaction receipt is error ',
    });

    t.string('receiptRet', {
      nullable: true,
      description: 'Transaction response, is often a string in json format',
    } as any);

    t.field('cyclesPrice', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasPrice` in eth',
    });

    t.field('cyclesLimit', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasLimit` in eth',
    });

    t.field('cyclesUsed', {
      type: 'Uint64',
      description: 'Cycles used, similar to the `gasUsed` in eth',
    });

    t.field('nonce', {
      type: 'Hash',
      description:
        'A random 32 bytes, the `nonce` in Muta is difference with Ethereum',
    });

    t.field('pubkey', {
      type: 'Bytes',
      description: 'Public key of of a transaction sender',
    });

    t.field('signature', {
      type: 'Bytes',
      description: 'Signature of a transaction',
    });

    t.field('from', {
      type: 'Account',
      resolve() {
        return {};
      },
    });

    t.field('block', {
      type: 'Block',
      resolve() {
        return {};
      },
    });
  },
});
