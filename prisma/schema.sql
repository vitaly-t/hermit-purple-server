CREATE UNLOGGED TABLE "public"."Block" (
  "blockHash" text NOT NULL DEFAULT '',
  "execHeight" integer NOT NULL DEFAULT 0,
  "height" integer NOT NULL,
  "orderRoot" text NOT NULL DEFAULT '',
  "preHash" text NOT NULL DEFAULT '',
  "proofBitmap" text NOT NULL DEFAULT '',
  "proofBlockHash" text NOT NULL DEFAULT '',
  "proofRound" text NOT NULL DEFAULT '',
  "proofSignature" text NOT NULL DEFAULT '',
  "proposer" text NOT NULL DEFAULT '',
  "stateRoot" text NOT NULL DEFAULT '',
  "timestamp" text NOT NULL DEFAULT '0000000000000000',
  "transactionsCount" integer NOT NULL DEFAULT 0,
  "validatorVersion" text NOT NULL DEFAULT '',
  PRIMARY KEY ("height")
);
CREATE UNLOGGED TABLE "public"."Transaction" (
  "block" integer NOT NULL,
  "chainId" text NOT NULL DEFAULT '',
  "cyclesLimit" text NOT NULL DEFAULT '',
  "cyclesPrice" text NOT NULL DEFAULT '',
  "cyclesUsed" text,
  "from" text NOT NULL,
  "method" text NOT NULL DEFAULT '',
  "nonce" text NOT NULL DEFAULT '',
  "order" SERIAL,
  "payload" text NOT NULL DEFAULT '',
  "pubkey" text NOT NULL DEFAULT '',
  "receiptIsError" boolean,
  "receiptRet" text,
  "serviceName" text NOT NULL DEFAULT '',
  "signature" text NOT NULL DEFAULT '',
  "timeout" text NOT NULL DEFAULT '',
  "txHash" text NOT NULL DEFAULT '',
  PRIMARY KEY ("order")
);
CREATE UNLOGGED TABLE "public"."Event" (
  "data" text NOT NULL DEFAULT '',
  "id" SERIAL,
  "receipt" integer NOT NULL,
  "service" text NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
);
CREATE UNLOGGED TABLE "public"."Validator" (
  "address" text NOT NULL,
  "proposeWeight" integer NOT NULL DEFAULT 0,
  "voteWeight" integer NOT NULL DEFAULT 0,
  PRIMARY KEY ("address")
);
CREATE UNLOGGED TABLE "public"."Account" (
  "address" text NOT NULL,
  PRIMARY KEY ("address")
);
CREATE UNLOGGED TABLE "public"."Asset" (
  "account" text,
  "assetId" text NOT NULL,
  "name" text NOT NULL DEFAULT '',
  "supply" text NOT NULL DEFAULT '',
  "symbol" text NOT NULL DEFAULT '',
  "transaction" integer NOT NULL,
  PRIMARY KEY ("assetId")
);
CREATE UNLOGGED TABLE "public"."AssetTransfer" (
  "asset" text NOT NULL,
  "from" text NOT NULL,
  "id" SERIAL,
  "to" text NOT NULL,
  "transaction" integer NOT NULL,
  "value" text NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
);
CREATE UNLOGGED TABLE "public"."Balance" (
  "account" text NOT NULL,
  "asset" text NOT NULL,
  "balance" text NOT NULL DEFAULT '',
  "compound" text NOT NULL DEFAULT '',
  "id" SERIAL,
  PRIMARY KEY ("id")
);
CREATE UNLOGGED TABLE "public"."_BlockToValidator" ("A" integer NOT NULL, "B" text NOT NULL);
CREATE UNLOGGED TABLE "public"."TransferHistory" (
  "id" SERIAL,
  "blockHeight" integer NOT NULL DEFAULT 0,
  "assetName" text NOT NULL DEFAULT '',
  "assetId" text NOT NULL DEFAULT '',
  "assetSymbol" text NOT NULL DEFAULT '',
  "txHash" text NOT NULL DEFAULT '',
  "service" text NOT NULL DEFAULT '',
  "method" text NOT NULL DEFAULT '',
  "receiptIsError" boolean DEFAULT false,
  "from" text NOT NULL DEFAULT '',
  "to" text NOT NULL DEFAULT '',
  "value" text NOT NULL DEFAULT '',
  PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Block.blockHash" ON "public"."Block"("blockHash");
CREATE UNIQUE INDEX "Transaction.txHash" ON "public"."Transaction"("txHash");
CREATE UNIQUE INDEX "Asset.transaction" ON "public"."Asset"("transaction");
CREATE UNIQUE INDEX "Asset_transaction" ON "public"."Asset"("transaction");
CREATE UNIQUE INDEX "AssetTransfer.transaction" ON "public"."AssetTransfer"("transaction");
CREATE UNIQUE INDEX "Balance.compound" ON "public"."Balance"("compound");
CREATE UNIQUE INDEX "_BlockToValidator_AB_unique" ON "public"."_BlockToValidator"("A", "B");
CREATE INDEX "Transaction.from" on "public"."Transaction"("from");
CREATE INDEX "Transaction.block" ON "public"."Transaction"("block");
CREATE INDEX "Event.receipt" ON "public"."Event"("receipt");
CREATE INDEX "Asset.account" ON "public"."Asset"("account");
CREATE INDEX "Balance.account" on "public"."Balance"("account");
CREATE INDEX "AssetTransfer.asset" ON "public"."AssetTransfer"("asset");
CREATE INDEX "AssetTransfer.from" on "public"."AssetTransfer"("from");
CREATE INDEX "AssetTransfer.to" on "public"."AssetTransfer"("to");
CREATE INDEX "TransferHistory.from" on "public"."TransferHistory"("from");
CREATE INDEX "TransferHistory.to" on "public"."TransferHistory"("to");
CREATE INDEX "TransferHistory.assetId" on "public"."TransferHistory"("assetId");
CREATE INDEX "TransferHistory.txHash" on "public"."TransferHistory"("txHash");
CREATE INDEX "TransferHistory.blockHeight" on "public"."TransferHistory"("blockHeight");
ALTER TABLE "public"."Block"
SET
  (autovacuum_enabled = false);
ALTER TABLE "public"."Transaction"
SET
  (autovacuum_enabled = false);
ALTER TABLE "public"."Event"
SET
  (autovacuum_enabled = false);
ALTER TABLE "public"."AssetTransfer"
SET
  (autovacuum_enabled = false);
ALTER TABLE "public"."Balance"
SET
  (autovacuum_enabled = false);