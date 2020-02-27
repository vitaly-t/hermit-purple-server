import {
  Block,
  Transaction as RawTransaction,
  Asset as RawAsset,
  AssetTransfer as RawAssetTransfer,
  Event as RawEvent,
  Validator as RawValidator,
  Account as RawAccount,
  Balance as RawBalance,
} from '@prisma/client';

export { Block };
export type Transaction = Omit<RawTransaction, 'order'> & {
  // FOREIGN KEY("from") REFERENCE "public"."Account"("address")
  from: string;
};
export type Asset = RawAsset & {
  // FOREIGN KEY("account") REFERENCE "public"."Account"("address")
  account: string;
  // FOREIGN KEY("transaction") REFERENCE "public"."Transaction"("order")
  transaction: number;
};

export type AssetTransfer = Omit<RawAssetTransfer, 'id'> & {
  // FOREIGN KEY("asset") REFERENCE "public"."Asset"("assetId")
  asset: string;
  // FOREIGN KEY("from") REFERENCE "public"."Account"("address")
  from: string;
  // FOREIGN KEY("to") REFERENCE "public"."Account"("address")
  to: string;
  // FOREIGN KEY("transaction") REFERENCE "public"."Transaction"("order")
  transaction: number;
};

export type Event = Omit<RawEvent, 'id'> & {
  // FOREIGN KEY("receipt") REFERENCE "public"."Transaction"("order")
  receipt: number;
};

export type Validator = RawValidator;

export type Account = RawAccount;

export type Balance = Omit<RawBalance, 'id'> & {
  // FOREIGN KEY("account") REFERENCE "public"."Account"("address")
  account: string;

  // FOREIGN KEY("asset") REFERENCE "public"."Asset"("assetId")
  asset: string;
};

export interface _BlockToValidator {
  // FOREIGN KEY("A") REFERENCE "public"."Block"("height")
  A: number;

  // FOREIGN KEY("B") REFERENCE "public"."Validator"("address")
  B: string;
}
