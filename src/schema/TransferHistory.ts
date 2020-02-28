import { objectType } from 'nexus';

export const TransferHistory = objectType({
  name: 'TransferHistory',
  definition(t) {
    t.model.method();
    t.model.blockHeight();
    t.model.assetName();
    t.model.assetId();
    t.model.assetName();
    t.model.assetSymbol();
    t.model.service();
    t.model.receiptIsError();
    t.model.from();
    t.model.to();
  },
});
