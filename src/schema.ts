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

const Block = objectType({
  name: 'Block',
  definition(t) {
    t.model.height();
    t.model.transactionsCount();
    t.model.transactions();
    t.model.preHash();
    t.model.timestamp();
    t.model.proposer();
    t.model.orderRoot({
      alias: 'orderedTransactionRoot',
    });
    t.model.stateRoot();
    t.model.proofBitmap();
    t.model.proofBlockHash();
    t.model.proofRound();
    t.model.proofSignature();
    t.model.validatorVersion();
    t.model.validators();
  },
});

const Account = objectType({
  name: 'Account',
  definition(t) {
    t.model.address();
    t.model.transactions();
    t.model.balances({ filtering: true, pagination: true, ordering: true });
  },
});

const Balance = objectType({
  name: 'Balance',
  definition(t) {
    t.model.account();
    t.model.asset();
    t.model.balance();
    t.model.compound();
  },
});

const Transaction = objectType({
  name: 'Transaction',
  definition(t) {
    t.model.order();
    t.model.txHash();
    t.model.block();
    t.model.serviceName();
    t.model.method();
    t.model.payload();
    t.model.cyclesPrice();
    t.model.cyclesLimit();
    t.model.nonce();
    t.model.from();
    t.model.pubkey();
    t.model.signature();
    t.model.receiptIsError();
    t.model.receiptRet();
    t.model.cyclesUsed();
  },
});

const Event = objectType({
  name: 'Event',
  definition(t) {
    t.model.data();
    t.model.service();
  },
});

const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.model.assetId();
    t.model.account();
    t.model.name();
    t.model.supply();
    t.model.symbol();
    t.model.transaction();
    t.model.assetTransfers();
  },
});

const AssetTransfer = objectType({
  name: 'AssetTransfer',
  definition(t) {
    t.model.from();
    t.model.to();
    t.model.value();
    t.model.transaction();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.block();
    t.crud.transaction();
    t.crud.validator();
    t.crud.account();
    t.crud.asset();
    t.crud.assetTransfer();

    t.crud.accounts({ ordering: true, filtering: true, pagination: true });
    t.crud.blocks({ ordering: true, filtering: true, pagination: true });
    t.crud.transactions({ ordering: true, filtering: true, pagination: true });
    t.crud.assets({ ordering: true, filtering: true, pagination: true });
    t.crud.assetTransfers({
      ordering: true,
      filtering: true,
      pagination: true,
    });
  },
});

export const schema = makeSchema({
  types: [
    Account,
    Balance,
    Event,
    Validator,
    Transaction,
    Block,
    Query,
    Asset,
    AssetTransfer,
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
