
CREATE TABLE "public"."Block" (
    "height" integer  NOT NULL DEFAULT 0,
    "id" SERIAL,
    "orderRoot" text  NOT NULL DEFAULT '',
    "preHash" text  NOT NULL DEFAULT '',
    "proof" integer  NOT NULL ,
    "proposer" text  NOT NULL DEFAULT '',
    "stateRoot" text  NOT NULL DEFAULT '',
    "timestamp" timestamp(3)  NOT NULL DEFAULT '1970-01-01 00:00:00',
    "transactionsCount" integer  NOT NULL DEFAULT 0,
    "validatorVersion" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
); 

CREATE TABLE "public"."Validator" (
    "address" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "proposeWeight" integer  NOT NULL DEFAULT 0,
    "voteWeight" integer  NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
); 

CREATE TABLE "public"."Transaction" (
    "account" integer  NOT NULL ,
    "block" integer  NOT NULL ,
    "chainId" text  NOT NULL DEFAULT '',
    "cyclesLimit" text  NOT NULL DEFAULT '',
    "cyclesPrice" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "method" text  NOT NULL DEFAULT '',
    "nonce" text  NOT NULL DEFAULT '',
    "payload" text  NOT NULL DEFAULT '',
    "pubkey" text  NOT NULL DEFAULT '',
    "serviceName" text  NOT NULL DEFAULT '',
    "signature" text  NOT NULL DEFAULT '',
    "timeout" text  NOT NULL DEFAULT '',
    "txHash" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Receipt" (
    "cyclesUsed" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "response" integer  NOT NULL ,
    "transaction" text  NOT NULL ,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."ReceiptResponse" (
    "id" SERIAL,
    "isError" boolean  NOT NULL DEFAULT false,
    "ret" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Event" (
    "data" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "receipt" integer  NOT NULL ,
    "service" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Proof" (
    "bitmap" text  NOT NULL DEFAULT '',
    "blockHash" text  NOT NULL DEFAULT '',
    "height" integer  NOT NULL DEFAULT 0,
    "id" SERIAL,
    "round" integer  NOT NULL DEFAULT 0,
    "signature" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Account" (
    "address" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."Asset" (
    "assetId" text  NOT NULL DEFAULT '',
    "creationTransaction" integer  NOT NULL ,
    "id" SERIAL,
    "issuer" integer  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    "supply" text  NOT NULL DEFAULT '',
    "symbol" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."AssetTransfer" (
    "asset" integer  NOT NULL ,
    "from" integer  NOT NULL ,
    "id" SERIAL,
    "to" integer  NOT NULL ,
    "transaction" integer  NOT NULL ,
    "value" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
);

CREATE TABLE "public"."_BlockToValidator" (
    "A" integer  NOT NULL ,
    "B" integer  NOT NULL 
);

CREATE UNIQUE INDEX "Block.height" ON "public"."Block"("height");

CREATE UNIQUE INDEX "Validator.address" ON "public"."Validator"("address");

CREATE UNIQUE INDEX "Transaction.txHash" ON "public"."Transaction"("txHash");

CREATE UNIQUE INDEX "Receipt.transaction" ON "public"."Receipt"("transaction");

CREATE UNIQUE INDEX "Receipt_transaction" ON "public"."Receipt"("transaction");

CREATE UNIQUE INDEX "Receipt_response" ON "public"."Receipt"("response");

CREATE UNIQUE INDEX "Account.address" ON "public"."Account"("address");

CREATE UNIQUE INDEX "Asset.assetId" ON "public"."Asset"("assetId");

CREATE UNIQUE INDEX "Asset.creationTransaction" ON "public"."Asset"("creationTransaction");

CREATE UNIQUE INDEX "Asset_creationTransaction" ON "public"."Asset"("creationTransaction");

CREATE UNIQUE INDEX "AssetTransfer.transaction" ON "public"."AssetTransfer"("transaction");

CREATE UNIQUE INDEX "AssetTransfer_transaction" ON "public"."AssetTransfer"("transaction");

CREATE UNIQUE INDEX "_BlockToValidator_AB_unique" ON "public"."_BlockToValidator"("A","B");

ALTER TABLE "public"."Block" ADD FOREIGN KEY ("proof") REFERENCES "public"."Proof"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY ("block") REFERENCES "public"."Block"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Transaction" ADD FOREIGN KEY ("account") REFERENCES "public"."Account"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Receipt" ADD FOREIGN KEY ("transaction") REFERENCES "public"."Transaction"("txHash") ON DELETE RESTRICT;

ALTER TABLE "public"."Receipt" ADD FOREIGN KEY ("response") REFERENCES "public"."ReceiptResponse"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Event" ADD FOREIGN KEY ("receipt") REFERENCES "public"."Receipt"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Asset" ADD FOREIGN KEY ("creationTransaction") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."Asset" ADD FOREIGN KEY ("issuer") REFERENCES "public"."Account"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("transaction") REFERENCES "public"."Transaction"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("from") REFERENCES "public"."Account"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("to") REFERENCES "public"."Account"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."AssetTransfer" ADD FOREIGN KEY ("asset") REFERENCES "public"."Asset"("id") ON DELETE RESTRICT;

ALTER TABLE "public"."_BlockToValidator" ADD FOREIGN KEY ("A") REFERENCES "public"."Block"("id") ON DELETE CASCADE;

ALTER TABLE "public"."_BlockToValidator" ADD FOREIGN KEY ("B") REFERENCES "public"."Validator"("id") ON DELETE CASCADE;