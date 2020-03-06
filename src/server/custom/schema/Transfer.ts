import { arg, objectType, queryField } from 'nexus';

export const TransferHistory = objectType({
  name: 'Transfer',
  definition(t) {
    t.int('id');

    t.int('blockHeight');

    t.string('timestamp', {
      description: 'A datetime string format as UTC string',
      resolve(parent) {
        return new Date(
          +(Number('0x' + parent.timestamp) + '000'),
        ).toUTCString();
      },
    });

    t.field('asset', {
      type: 'Asset',
      resolve() {
        return {};
      },
    });

    t.string('value');

    t.string('txHash');

    t.boolean('receiptIsError', {
      resolve(parent) {
        return parent?.receiptIsError ?? false;
      },
    });

    t.string('from');
    t.string('to');
  },
});

export const transferConnection = queryField(t => {
  t.connectionField('transferHistories', {
    type: 'Transfer',
    additionalArgs: {
      fromOrTo: arg({
        type: 'Address',
      }),
      asset: arg({
        type: 'Hash',
      }),
    },
    nodes() {
      return [];
    },
  });
});
