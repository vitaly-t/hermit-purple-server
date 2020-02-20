import { objectType } from "nexus";

export const AssetTransfer = objectType({
  name: 'AssetTransfer',
  definition(t) {
    t.model.value();
    t.field('value', {
      type: 'Uint64',
      description: 'The amount of the transfer',
    });

    t.model.from();
    t.model.to();
    t.model.asset();
    t.model.transaction();
  },
});