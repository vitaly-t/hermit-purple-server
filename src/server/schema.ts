import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from 'nexus';
import { OrderByEnum } from './schema/enum/OrderBy';
import {
  AddressScalar,
  BytesScalar,
  HashScalar,
  Uint64Scalar,
} from './schema/scalar';
import {
  TransferHistoriesOrderByInputType,
  TransferHistoriesWhereInputType,
  TransferHistory,
} from './schema/TransferHistory';
import { Validator } from './schema/Validator';
import { Block } from './schema/Block';
import { Account } from './schema/Account';
import { Balance } from './schema/Balance';
import { Transaction } from './schema/Transaction';
import { Event } from './schema/Event';
import { Asset } from './schema/Asset';
import { AssetTransfer } from './schema/AssetTransfer';
import { Query } from './schema/Query';

export const schema = makeSchema({
  types: [
    /* input objects */
    TransferHistoriesWhereInputType,
    TransferHistoriesOrderByInputType,

    /* enums */
    OrderByEnum,

    /* scalar types */
    AddressScalar,
    Uint64Scalar,
    HashScalar,
    BytesScalar,

    /* union */
    // ResolvedTransaction,

    /* objects */
    Account,
    Balance,
    Event,
    Validator,
    Transaction,
    Block,
    Asset,
    AssetTransfer,
    TransferHistory,

    /* Query */
    Query,
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
