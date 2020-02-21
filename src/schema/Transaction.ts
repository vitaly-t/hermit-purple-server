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
    t.model.order();
    t.int('order', {
      description: 'The transaction order number of all transactions ',
    });

    t.model.txHash();
    t.field('txHash', {
      type: 'Hash',
      description: 'The transaction hash',
    });

    t.model.serviceName();
    t.string('serviceName', {
      description: 'Represents what `service` does the transaction called ',
    });

    t.model.method();
    t.string('method', {
      description: 'Represents what `method` does the transaction called ',
    });

    t.model.payload();
    t.string('payload', {
      description: 'Represents what `payload` of the transaction called method',
    });

    t.model.receiptIsError();
    // t.boolean('receiptIsError', {
    //   nullable: true,
    //   description: 'True when transaction receipt is error ',
    // });

    t.model.receiptRet();
    t.string('receiptRet', {
      nullable: true,
      description: 'Transaction response, is often a string in json format',
    } as any);

    t.model.cyclesPrice();
    t.field('cyclesPrice', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasPrice` in eth',
    });

    t.model.cyclesLimit();
    t.field('cyclesLimit', {
      type: 'Uint64',
      description: 'Cycles price, similar to the `gasLimit` in eth',
    });

    t.model.cyclesUsed();
    t.field('cyclesUsed', {
      type: 'Uint64',
      description: 'Cycles used, similar to the `gasUsed` in eth',
    });

    t.model.nonce();
    t.field('nonce', {
      type: 'Hash',
      description:
        'A random 32 bytes, the `nonce` in Muta is difference with Ethereum',
    });

    t.model.pubkey();
    t.field('pubkey', {
      type: 'Bytes',
      description: 'Public key of of a transaction sender',
    });

    t.model.signature();
    t.field('signature', {
      type: 'Bytes',
      description: 'Signature of a transaction',
    });

    t.model.from();
    t.model.block();
    t.model.transfer();
  },
});
