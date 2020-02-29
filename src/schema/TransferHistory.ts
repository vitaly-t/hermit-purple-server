import { inputObjectType, objectType } from 'nexus';

export const TransferHistory = objectType({
  name: 'TransferHistory',
  definition(t) {
    t.int('blockHeight');

    t.string('timestamp', {
      description: 'A datetime string format as UTC string',
      resolve(parent) {
        return new Date(
          +(Number('0x' + parent.timestamp) + '000'),
        ).toUTCString();
      },
    });

    t.string('assetId');
    t.string('assetName');
    t.string('assetSymbol');
    t.string('value');

    t.string('txHash');

    t.string('service');
    t.string('method');

    t.boolean('receiptIsError', {
      resolve(parent) {
        return parent?.receiptIsError ?? false;
      },
    });

    t.string('from');
    t.string('to');
  },
});
export const TransferHistoriesWhereInputType = inputObjectType({
  name: 'TransferHistoriesWhereInput',
  definition(t) {
    t.int('blockHeight');
    t.string('assetId');
    t.string('from');
    t.string('txHash');
    t.string('to');
  },
});