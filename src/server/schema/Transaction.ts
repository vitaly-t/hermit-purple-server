import { objectType, queryField, arg, stringArg } from 'nexus';

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

    t.field('cyclesPrice', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasPrice` in eth',
    });

    t.field('cyclesLimit', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasLimit` in eth',
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
        return { address: '' };
      },
    });

    t.field('block', {
      type: 'Block',
      resolve() {
        return {};
      },
    });

    t.field('receipt', {
      type: 'Receipt',
      nullable: true,
      resolve() {
        return null;
      },
    });
  },
});

export const transactionQuery = queryField(t => {
  t.field('transaction', {
    type: 'Transaction',
    args: {
      order: arg({
        type: 'Int',
      }),
      txHash: arg({
        type: 'Hash',
      }),
    },
    resolve() {
      return {};
    },
  });
});

export const transactionConnection = queryField(t => {
  t.connectionField('transactions', {
    type: 'Transaction',
    additionalArgs: {
      block: arg({
        type: 'Int',
      }),
      from: arg({
        type: 'Address',
      }),
      service: arg({
        type: 'String',
      }),
      method: arg({
        type: 'String',
      }),
    },

    async nodes() {
      return [];
    },
  });
});
