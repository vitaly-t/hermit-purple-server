import { arg, intArg, queryType } from 'nexus';
import { orderBy as sortBy } from 'lodash';

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

    t.list.field('transferHistories', {
      type: 'TransferHistory',
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

        const limit = first || last;
        const offset = skip ?? 0;
        const orderById = args.orderBy?.id || 'asc';
        const orderBy = (() => {
          if (orderById === 'desc') {
            if (last) return 'asc';
            return 'desc';
          }
          if (last) return 'desc';
          return 'asc';
        })();

        if (!isValidHex(assetId) || !isValidHex(from) || !isValidHex(to)) {
          return [];
        }

        let whereClause = Object.entries({
          assetId,
          blockHeight,
          from,
          to,
          txHash,
        })
          .map(([key, value]) => value && `"${key}" = '${value}'`)
          .filter(x => x)
          .join(' OR ');
        whereClause = whereClause && `where ${whereClause}`;
        const sql = `
              SELECT
                *
              from(
                  select
                    *
                  from public."TransferHistory"
                  ${whereClause}
                  ORDER BY
                    "id" ${orderBy}
                ) as "items"
              ORDER BY
                "id" ${orderBy}
              offset
                ${offset}
              limit
                ${limit};`;
        const histories = await ctx.prisma.raw(sql);
        return sortBy(histories, x => x.id, orderById);
      },
    });
  },
});
