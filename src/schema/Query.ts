import { queryType } from "nexus";

export const Query = queryType({
  definition(t) {
    t.crud.block();
    t.crud.transaction();
    t.crud.validator();
    t.crud.account();
    t.crud.asset();
    t.crud.assetTransfer();

    t.crud.accounts({ordering: true, filtering: true, pagination: true});
    t.crud.blocks({ordering: true, filtering: true, pagination: true});
    t.crud.transactions({ordering: true, filtering: true, pagination: true});

    t.crud.assets({ordering: true, filtering: true, pagination: true});
    t.crud.assetTransfers({
      ordering: true,
      filtering: true,
      pagination: true,
    });
  },
});