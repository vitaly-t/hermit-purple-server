// @ts-nocheck 
/* tslint:disable */


export namespace AccountFields {
    export type address = string;

}

export interface Account {
    address: AccountFields.address;

}

export namespace BlockFields {
    export type height = number;
    export type execHeight = number;
    export type blockHash = string;
    export type orderRoot = string;
    export type prevHash = string;
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
    prevHash: BlockFields.prevHash;
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
    export type id = number;
    export type block = number;
    export type cyclesUsed = string;
    export type isError = boolean;
    export type ret = string;
    export type txHash = string;

}

export interface Receipt {
    id: ReceiptFields.id;
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
