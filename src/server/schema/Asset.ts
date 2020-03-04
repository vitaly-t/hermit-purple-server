import { objectType } from "nexus";

export const Asset = objectType({
  name: 'Asset',
  definition(t) {
    t.model.assetId();
    t.field('assetId', {type: 'Hash'});
    t.model.name();
    t.string('name', {description: 'The **full** name of this asset'});
    t.model.symbol();
    t.string('symbol', {description: 'The **short** name of this asset'});
    t.model.supply();
    t.field('supply', {type: 'Uint64'});

    t.model.account();
    t.model.transaction();
    t.model.assetTransfers();
  },
});