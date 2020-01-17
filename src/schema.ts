import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, objectType, queryType } from 'nexus';

const Validator = objectType({
  name: 'Validator',
  definition(t) {
    t.model.address();
    t.model.proposeWeight();
    t.model.voteWeight();
    t.model.epoches();
  },
});

const Epoch = objectType({
  name: 'Epoch',
  definition(t) {
    t.model.epochId();
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

const Transaction = objectType({
  name: 'Transaction',
  definition(t) {
    t.model.txHash();
    t.model.epoch();
    t.model.serviceName();
    t.model.method();
    t.model.payload();
    t.model.cyclesPrice();
    t.model.cyclesLimit();
    t.model.nonce();
    t.model.nonce();
    t.model.pubkey();
    t.model.signature();
  },
});

const Proof = objectType({
  name: 'Proof',
  definition(t) {
    t.model.signature();
    t.model.round();
    t.model.bitmap();
    t.model.epochHash();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.epoch();
    t.crud.transaction();
    t.crud.validator();
    t.crud.epoches({ ordering: true, filtering: true, pagination: true });
    t.crud.transactions({ ordering: true, filtering: true, pagination: true });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneEpoch();
    t.crud.createOneTransaction();
    t.crud.createOneValidator();
  },
});

export const schema = makeSchema({
  types: [Proof, Validator, Transaction, Epoch, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
});
