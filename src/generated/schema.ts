/* tslint:disable */


/**
 * AUTO-GENERATED FILE @ 2020-03-14 16:03:11 - DO NOT EDIT!
 *
 * This file was automatically generated by schemats v.3.0.3
 * $ schemats generate -c mysql://username:password@localhost:3306/muta -t Account -t Asset -t Balance -t Block -t BlockValidator -t Event -t Receipt -t Transaction -t Transfer -s muta
 *
 */


export namespace AccountFields {
    export type address = string;

}

export interface Account {
    address: AccountFields.address;

}

export namespace AssetFields {
    export type account = string;
    export type assetId = string;
    export type name = string;
    export type supply = string;
    export type precision = number;
    export type symbol = string;
    export type amount = string;
    export type txHash = string;

}

export interface Asset {
    account: AssetFields.account;
    assetId: AssetFields.assetId;
    name: AssetFields.name;
    supply: AssetFields.supply;
    precision: AssetFields.precision;
    symbol: AssetFields.symbol;
    amount: AssetFields.amount;
    txHash: AssetFields.txHash;

}

export namespace BalanceFields {
    export type account = string;
    export type asset = string;
    export type balance = string;
    export type amount = string;
    export type id = number;

}

export interface Balance {
    account: BalanceFields.account;
    asset: BalanceFields.asset;
    balance: BalanceFields.balance;
    amount: BalanceFields.amount;
    id: BalanceFields.id;

}

export namespace BlockFields {
    export type height = number;
    export type execHeight = number;
    export type blockHash = string;
    export type orderRoot = string;
    export type preHash = string;
    export type proofBitmap = string;
    export type proofRound = string;
    export type proofSignature = string;
    export type proposer = string;
    export type stateRoot = string;
    export type timestamp = string;
    export type transactionsCount = number;
    export type validatorVersion = string;

}

export interface Block {
    height: BlockFields.height;
    execHeight: BlockFields.execHeight;
    blockHash: BlockFields.blockHash;
    orderRoot: BlockFields.orderRoot;
    preHash: BlockFields.preHash;
    proofBitmap: BlockFields.proofBitmap;
    proofRound: BlockFields.proofRound;
    proofSignature: BlockFields.proofSignature;
    proposer: BlockFields.proposer;
    stateRoot: BlockFields.stateRoot;
    timestamp: BlockFields.timestamp;
    transactionsCount: BlockFields.transactionsCount;
    validatorVersion: BlockFields.validatorVersion;

}

export namespace BlockValidatorFields {
    export type id = number;
    export type address = string;
    export type proposeWeight = number;
    export type version = string;
    export type voteWeight = number;

}

export interface BlockValidator {
    id: BlockValidatorFields.id;
    address: BlockValidatorFields.address;
    proposeWeight: BlockValidatorFields.proposeWeight;
    version: BlockValidatorFields.version;
    voteWeight: BlockValidatorFields.voteWeight;

}

export namespace EventFields {
    export type data = string;
    export type id = number;
    export type txHash = string;
    export type service = string;

}

export interface Event {
    data: EventFields.data;
    id: EventFields.id;
    txHash: EventFields.txHash;
    service: EventFields.service;

}

export namespace ReceiptFields {
    export type block = number;
    export type cyclesUsed = string;
    export type isError = boolean;
    export type ret = string;
    export type txHash = string;

}

export interface Receipt {
    block: ReceiptFields.block;
    cyclesUsed: ReceiptFields.cyclesUsed;
    isError: ReceiptFields.isError;
    ret: ReceiptFields.ret;
    txHash: ReceiptFields.txHash;

}

export namespace TransactionFields {
    export type block = number;
    export type chainId = string;
    export type cyclesLimit = string;
    export type cyclesPrice = string;
    export type from = string;
    export type method = string;
    export type nonce = string;
    export type order = number;
    export type payload = string;
    export type pubkey = string;
    export type serviceName = string;
    export type signature = string;
    export type timeout = string;
    export type txHash = string;

}

export interface Transaction {
    block: TransactionFields.block;
    chainId: TransactionFields.chainId;
    cyclesLimit: TransactionFields.cyclesLimit;
    cyclesPrice: TransactionFields.cyclesPrice;
    from: TransactionFields.from;
    method: TransactionFields.method;
    nonce: TransactionFields.nonce;
    order: TransactionFields.order;
    payload: TransactionFields.payload;
    pubkey: TransactionFields.pubkey;
    serviceName: TransactionFields.serviceName;
    signature: TransactionFields.signature;
    timeout: TransactionFields.timeout;
    txHash: TransactionFields.txHash;

}

export namespace TransferFields {
    export type asset = string;
    export type from = string;
    export type id = number;
    export type to = string;
    export type txHash = string;
    export type value = string;
    export type amount = string;
    export type block = number;
    export type timestamp = string;

}

export interface Transfer {
    asset: TransferFields.asset;
    from: TransferFields.from;
    id: TransferFields.id;
    to: TransferFields.to;
    txHash: TransferFields.txHash;
    value: TransferFields.value;
    amount: TransferFields.amount;
    block: TransferFields.block;
    timestamp: TransferFields.timestamp;

}