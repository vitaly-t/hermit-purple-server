import { arg, intArg, queryType } from 'nexus';
import { collection } from '../sync/db/mongo';

const isHex = require('is-hex');

function isValidHex(x: string | undefined | null) {
  if (x === undefined || x === null) return true;
  return isHex(x);
}

export const Query = queryType({
  definition(t) {
    t.crud.block();
    t.crud.transaction();
    t.crud.validator();
    t.crud.account();
    t.crud.asset();
    t.crud.assetTransfer();
    t.crud.transferHistory();

    t.crud.accounts({ ordering: true, filtering: true, pagination: true });
    t.crud.blocks({ ordering: true, filtering: true, pagination: true });
    t.crud.transactions({ ordering: true, filtering: true, pagination: true });

    t.crud.assets({ ordering: true, filtering: true, pagination: true });
    t.crud.assetTransfers({
      ordering: true,
      filtering: true,
      pagination: true,
    });

    t.list.field('transactionHistories', {
      type: 'Transaction',
      nullable: true,
      args: {
        where: arg({
          type: 'TransferHistoriesWhereInput',
        }),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
        orderBy: arg({
          type: 'TransferHistoriesOrderByInputType',
        }),
      },
      async resolve(root, args, ctx) {
        const { first, last, skip } = args;
        const { assetId, blockHeight, from, txHash, to } = args.where || {};

        const limit = (first || last) as number;
        const orderById = args.orderBy?.id || 'asc';
        const orderBy: 1 | -1 = (() => {
          if (orderById === 'desc') {
            if (last) return 1;
            return -1;
          }
          if (last) return -1;
          return 1;
        })();

        if (!isValidHex(assetId) || !isValidHex(from) || !isValidHex(to)) {
          return [];
        }

        const transaction = await collection('transaction');
        const histories = await transaction
          .find({
            ...(from ? { from } : {}),
            ...(blockHeight ? { order: blockHeight } : {}),
            ...(txHash ? { txHash } : {}),
          })
          .sort({ order: orderBy })
          .skip(skip ?? 0)
          .limit(limit)
          .toArray();
        return histories;
      },
    });
  },
});
