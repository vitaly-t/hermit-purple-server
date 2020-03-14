/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as ctx from "../impl/server/Context"
import * as db from "./schema"
import { core, connectionPluginCore } from "nexus"

declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    connectionField<FieldName extends string>(
            fieldName: FieldName, 
            config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName> 
          ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  OrderByEnum: "asc" | "desc"
}

export interface NexusGenRootTypes {
  Account: db.Account;
  Asset: db.Asset;
  Balance: db.Balance;
  Block: db.Block;
  Event: db.Event;
  Query: {};
  Receipt: db.Receipt;
  Transaction: db.Transaction;
  Transfer: db.Transfer;
  Validator: { // root type
    address: string; // Address!
    proposeWeight: number; // Int!
    voteWeight: number; // Int!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  Address: string;
  Bytes: string;
  Hash: string;
  Timestamp: any;
  Uint64: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  OrderByEnum: NexusGenEnums['OrderByEnum'];
}

export interface NexusGenFieldTypes {
  Account: { // field return type
    address: string; // Address!
  }
  Asset: { // field return type
    assetId: string; // Hash!
    issuer: string; // Address!
    name: string; // String!
    supply: string; // Uint64!
    symbol: string; // String!
  }
  Balance: { // field return type
    account: string; // Address!
    amount: string; // String!
    asset: string; // Hash!
    balance: string; // Uint64!
  }
  Block: { // field return type
    blockHash: string; // Hash!
    height: number; // Int!
    orderRoot: string; // Hash!
    preHash: string; // Hash!
    proofBitmap: string; // Bytes!
    proofRound: string; // Uint64!
    proofSignature: string; // Bytes!
    proposer: string; // Address!
    stateRoot: string; // Hash!
    timestamp: any; // Timestamp!
    transactionsCount: number; // Int!
    validators: NexusGenRootTypes['Validator'][]; // [Validator!]!
    validatorVersion: string; // Uint64!
  }
  Event: { // field return type
    data: string; // String!
    service: string; // String!
  }
  Query: { // field return type
    assets: NexusGenRootTypes['Asset'][]; // [Asset!]!
    balances: NexusGenRootTypes['Balance'][]; // [Balance!]!
    block: NexusGenRootTypes['Block'] | null; // Block
    blocks: NexusGenRootTypes['Block'][]; // [Block!]!
    transaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    transactions: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
    transfer: NexusGenRootTypes['Transfer'] | null; // Transfer
    transfers: NexusGenRootTypes['Transfer'][]; // [Transfer!]!
  }
  Receipt: { // field return type
    cyclesUsed: string; // Uint64!
    isError: boolean | null; // Boolean
    ret: string | null; // String
  }
  Transaction: { // field return type
    block: number; // Int!
    cyclesLimit: string; // Uint64!
    cyclesPrice: string; // Uint64!
    from: string; // Address!
    method: string; // String!
    nonce: string; // Hash!
    order: number; // Int!
    payload: string; // String!
    pubkey: string; // Bytes!
    receipt: NexusGenRootTypes['Receipt'] | null; // Receipt
    serviceName: string; // String!
    signature: string; // Bytes!
    txHash: string; // Hash!
  }
  Transfer: { // field return type
    amount: string; // String!
    block: number; // Int!
    from: string; // Address!
    id: number; // Int!
    timestamp: any; // Timestamp!
    to: string; // Address!
    transaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    txHash: string; // Hash!
    value: string; // Uint64!
  }
  Validator: { // field return type
    address: string; // Address!
    proposeWeight: number; // Int!
    voteWeight: number; // Int!
  }
}

export interface NexusGenArgTypes {
  Query: {
    assets: { // args
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    balances: { // args
      address: string; // Address!
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    block: { // args
      hash?: string | null; // Hash
      height?: number | null; // Int
    }
    blocks: { // args
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    transaction: { // args
      txHash?: string | null; // Hash
    }
    transactions: { // args
      blockHeight?: number | null; // Int
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    transfer: { // args
      txHash?: string | null; // Hash
    }
    transfers: { // args
      asset?: string | null; // Hash
      blockHeight?: number | null; // Int
      first?: number | null; // Int
      fromOrTo?: string | null; // Address
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Account" | "Asset" | "Balance" | "Block" | "Event" | "Query" | "Receipt" | "Transaction" | "Transfer" | "Validator";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = "OrderByEnum";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Address" | "Boolean" | "Bytes" | "Float" | "Hash" | "ID" | "Int" | "String" | "Timestamp" | "Uint64";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: ctx.ServerContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginSchemaConfig {
  }
}