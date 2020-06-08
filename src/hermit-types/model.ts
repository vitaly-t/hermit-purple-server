import { Address, Bytes, Hash, Uint64 } from '@mutajs/types';

export interface Block {
  height: number;
  blockHash: Hash;
  execHeight: number;
  transactionsCount: number;
  prevHash: Hash;
  timestamp: string;
  orderRoot: Hash;
  stateRoot: Hash;
  proposer: Address;
  validatorVersion: Uint64;
  proofRound: Uint64;
  proofSignature: Bytes;
  proofBitmap: Bytes;
}

export interface Transaction {
  order: number;
  txHash: Hash;
  from: Address;
  serviceName: string;
  method: string;
  payload: string;
  cyclesPrice: Uint64;
  cyclesLimit: Uint64;
  nonce: Hash;
  pubkey: Bytes;
  signature: Bytes;
  chainId: Hash;
  timeout: Uint64;
  block: number;
}

export interface Receipt {
  block: number;
  txHash: Hash;
  isError: boolean;
  ret: string;
  cyclesUsed: Uint64;
}

export interface Event {
  service: string;
  data: string;
  txHash: Hash;
}

export interface Validator {
  address: Address;
  proposeWeight: number;
  voteWeight: number;
  version: Uint64;
}
