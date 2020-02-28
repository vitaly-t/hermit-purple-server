import { objectType } from 'nexus';

export const TransferHistory = objectType({
  name: 'TransferHistory',
  definition(t) {
    t.model.blockHeight();

    t.model.timestamp();
    t.string('timestamp', {
      description: 'A datetime string format as UTC string',
      resolve(parent) {
        return new Date(
          +(Number('0x' + parent.timestamp) + '000'),
        ).toUTCString();
      },
    });

    t.model.assetId();
    t.model.assetName();
    t.model.assetSymbol();
    t.model.value();

    t.model.txHash();

    t.model.service();
    t.model.method();

    t.model.receiptIsError();

    t.model.from();
    t.model.to();
  },
});
