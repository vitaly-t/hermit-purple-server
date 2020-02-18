CREATE TABLE "public"."Block" (
    "execHeight" integer  NOT NULL DEFAULT 0,
    "height" integer  NOT NULL ,
    "orderRoot" text  NOT NULL DEFAULT '',
    "preHash" text  NOT NULL DEFAULT '',
    "proofBitmap" text  NOT NULL DEFAULT '',
    "proofBlockHash" text  NOT NULL DEFAULT '',
    "proofRound" text  NOT NULL DEFAULT '',
    "proofSignature" text  NOT NULL DEFAULT '',
    "proposer" text  NOT NULL DEFAULT '',
    "stateRoot" text  NOT NULL DEFAULT '',
    "timestamp" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "transactionsCount" integer  NOT NULL DEFAULT 0,
    "validatorVersion" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("height")
);

CREATE TABLE "public"."Transaction" (
    "block" integer  NOT NULL ,
    "chainId" text  NOT NULL DEFAULT '',
    "cyclesLimit" text  NOT NULL DEFAULT '',
    "cyclesPrice" text  NOT NULL DEFAULT '',
    "cyclesUsed" text   ,
    "from" text  NOT NULL ,
    "method" text  NOT NULL DEFAULT '',
    "nonce" text  NOT NULL DEFAULT '',
    "order" SERIAL,
    "payload" text  NOT NULL DEFAULT '',
    "pubkey" text  NOT NULL DEFAULT '',
    "receiptIsError" boolean   ,
    "receiptRet" text   ,
    "serviceName" text  NOT NULL DEFAULT '',
    "signature" text  NOT NULL DEFAULT '',
    "timeout" text  NOT NULL DEFAULT '',
    "txHash" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("order")
);

CREATE TABLE "public"."Event" (
    "data" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "receipt" integer  NOT NULL ,
    "service" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Validator" (
    "address" text  NOT NULL ,
    "proposeWeight" integer  NOT NULL DEFAULT 0,
    "voteWeight" integer  NOT NULL DEFAULT 0,
    PRIMARY KEY ("address")
);

CREATE TABLE "public"."Account" (
    "address" text  NOT NULL ,
    PRIMARY KEY ("address")
);

CREATE TABLE "public"."Asset" (
    "account" text   ,
    "assetId" text  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "supply" text  NOT NULL DEFAULT '',
    "symbol" text  NOT NULL DEFAULT '',
    "transaction" integer  NOT NULL ,
    PRIMARY KEY ("assetId")
);

CREATE TABLE "public"."AssetTransfer" (
    "asset" text  NOT NULL ,
    "from" text  NOT NULL ,
    "id" SERIAL,
    "to" text  NOT NULL ,
    "transaction" integer  NOT NULL ,
    "value" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Balance" (
    "account" text  NOT NULL ,
    "asset" text  NOT NULL ,
    "balance" text  NOT NULL DEFAULT '',
    "compound" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."_BlockToValidator" (
    "A" integer  NOT NULL ,
    "B" text  NOT NULL 
);

CREATE UNIQUE INDEX "Transaction.txHash" ON "public"."Transaction"("txHash");

CREATE UNIQUE INDEX "Asset.transaction" ON "public"."Asset"("transaction");

CREATE UNIQUE INDEX "Asset_transaction" ON "public"."Asset"("transaction");

CREATE UNIQUE INDEX "AssetTransfer.transaction" ON "public"."AssetTransfer"("transaction");

CREATE UNIQUE INDEX "AssetTransfer_transaction" ON "public"."AssetTransfer"("transaction");

CREATE UNIQUE INDEX "Balance.compound" ON "public"."Balance"("compound");

CREATE UNIQUE INDEX "_BlockToValidator_AB_unique" ON "public"."_BlockToValidator"("A","B");

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY ("block") REFERENCES "public"."Block"("height") ON DELETE RESTRICT;

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY ("from") REFERENCES "public"."Account"("address") ON DELETE RESTRICT;

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("receipt") REFERENCES "public"."Transaction"("order") ON DELETE RESTRICT;

ALTER TABLE "public"."Asset" ADD FOREIGN KEY ("transaction") REFERENCES "public"."Transaction"("order") ON DELETE RESTRICT;

ALTER TABLE "public"."Asset" ADD FOREIGN KEY ("account") REFERENCES "public"."Account"("address") ON DELETE SET NULL;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("transaction") REFERENCES "public"."Transaction"("order") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("from") REFERENCES "public"."Account"("address") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("to") REFERENCES "public"."Account"("address") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("asset") REFERENCES "public"."Asset"("assetId") ON DELETE RESTRICT;

ALTER TABLE "public"."Balance" ADD FOREIGN KEY ("account") REFERENCES "public"."Account"("address") ON DELETE RESTRICT;

ALTER TABLE "public"."Balance" ADD FOREIGN KEY ("asset") REFERENCES "public"."Asset"("assetId") ON DELETE RESTRICT;

ALTER TABLE "public"."_BlockToValidator" ADD FOREIGN KEY ("A") REFERENCES "public"."Block"("height") ON DELETE CASCADE;

ALTER TABLE "public"."_BlockToValidator" ADD FOREIGN KEY ("B") REFERENCES "public"."Validator"("address") ON DELETE CASCADE;
