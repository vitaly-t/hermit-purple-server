import { intArg, queryType, stringArg } from 'nexus';
import { prisma } from '../sync';

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
        from: stringArg({ description: 'from address' }),
        to: stringArg({ description: 'to address' }),
        assetId: stringArg({ description: '' }),
        txHash: stringArg({ description: '' }),
        blockHeight: intArg(),
        first: intArg(),
        last: intArg(),
        skip: intArg(),
      },
      async resolve(root, args, ctx) {
        const {
          first,
          last,
          assetId,
          blockHeight,
          from,
          txHash,
          to,
          skip,
        } = args;
        const limit = first || last;
        const offset = skip ?? 0;
        const orderBy = first ? 'ASC' : 'DESC';

        let whereClause = Object.entries({
          assetId,
          blockHeight,
          from,
          to,
          txHash,
        })
          .map(([key, value]) => value && `"${key}" = '${value}'`)
          .filter(x => x)
          .join(' AND ');
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
                    "id" DESC
                ) as "items"
              ORDER BY
                "id" ${orderBy}
              offset
                ${offset}
              limit
                ${limit};`;
        return await prisma.raw(sql);
      },
    });
  },
});
