import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, objectType, queryType } from 'nexus';

const Validator = objectType({
  name: 'Validator',
  definition(t) {
    t.model.address();
    t.model.proposeWeight();
    t.model.voteWeight();
    t.model.blocks();
  },
});

const Epoch = objectType({
  name: 'Block',
  definition(t) {
    t.model.height();
    t.model.transactionsCount();
    t.model.transactions();
    t.model.preHash();
    t.model.timestamp();
    t.model.orderRoot({
      alias: 'orderedTransactionRoot',
    });
    t.model.stateRoot();
    t.model.proof();
    t.model.validatorVersion();
    t.model.validators();
  },
});

const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.address();
    t.model.transactions();
  },
});

const Transaction = objectType({
  name: 'Transaction',
  definition(t) {
    t.model.txHash();
    t.model.block();
    t.model.serviceName();
    t.model.method();
    t.model.payload();
    t.model.cyclesPrice();
    t.model.cyclesLimit();
    t.model.nonce();
    t.model.account();
    t.model.pubkey();
    t.model.signature();
    t.model.receipt();
  },
});

const Receipt = objectType({
  name: 'Receipt',
  definition(t) {
    t.model.block();
    t.model.transaction();
    t.model.cyclesUsed();
    t.model.events();
    t.model.response();
  },
});

const Event = objectType({
  name: 'Event',
  definition(t) {
    t.model.data();
    t.model.receipt();
  },
});

const ReceiptResponse = objectType({
  name: 'ReceiptResponse',
  definition(t) {
    t.model.isError();
    t.model.ret();
  },
});

const Proof = objectType({
  name: 'Proof',
  definition(t) {
    t.model.signature();
    t.model.round();
    t.model.bitmap();
    t.model.blockHash();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.block();
    t.crud.transaction();
    t.crud.validator();
    t.crud.receipt();
    t.crud.account();

    t.crud.accounts({ ordering: true, filtering: true, pagination: true });
    t.crud.blocks({ ordering: true, filtering: true, pagination: true });
    t.crud.transactions({ ordering: true, filtering: true, pagination: true });
    t.crud.receipts({ ordering: true, filtering: true, pagination: true });
  },
});

// const Mutation = objectType({
//   name: 'Mutation',
//   definition(t) {
//     t.crud.createOneBlock();
//     t.crud.createOneTransaction();
//     t.crud.createOneValidator();
//   },
// });

export const schema = makeSchema({
  types: [
    Account,
    Receipt,
    ReceiptResponse,
    Event,
    Proof,
    Validator,
    Transaction,
    Epoch,
    Query,
    // Mutation,
  ],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
