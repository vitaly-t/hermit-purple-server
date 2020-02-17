import {
  AssetCreateWithoutTransactionInput,
  AssetTransferCreateWithoutTransactionInput,
  TransactionCreateWithoutBlockInput,
} from '@prisma/client';
import { BigNumber } from 'bignumber.js';
import {
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { utils } from 'muta-sdk';
import { compoundBalance } from './utils';

const JSONbig = require('json-bigint');

/**
 * parse number with BigNumber
 */
export function safeJSONParse<O = unknown, I = any>(x: I): O {
  return JSONbig.parse(x);
}

/**
 * convert public key to address hex string without 0x
 * @param pubkey
 */
function addressFromPubkey(pubkey: string) {
  return utils.addressFromPublicKey(utils.toBuffer(pubkey)).toString('hex');
}

export type BalanceTask = Map<string, [string, string]>;

export class BlockTransactionsConverter {
  private readonly addresses: Set<string>;

  private readonly txQuery: GetTransactionQuery[];

  private readonly receiptQuery: GetReceiptQuery[];

  private readonly txInput: TransactionCreateWithoutBlockInput[];

  /**
   * key: hash(address + assetId)
   * value: [address, assetId]
   */
  private readonly balanceTask: BalanceTask;

  constructor(txs: GetTransactionQuery[], receipts: GetReceiptQuery[]) {
    this.addresses = new Set();
    this.balanceTask = new Map();

    this.txQuery = txs;
    this.receiptQuery = receipts;

    this.txInput = [];

    this.walk();
  }

  getRelevantAddresses(): Set<string> {
    return new Set(this.addresses);
  }

  getTransactionInput(): TransactionCreateWithoutBlockInput[] {
    return this.txInput;
  }

  getBalanceTask() {
    return this.balanceTask;
  }

  private setBalanceTask(address: string, assetId: string) {
    const compounded = compoundBalance(address, assetId);
    if (this.balanceTask.has(compounded)) return;
    this.balanceTask.set(compounded, [address, assetId]);
  }

  walk() {
    const { txQuery: txs, receiptQuery: receipts, addresses, txInput } = this;

    txs.forEach((tx, i) => {
      const {
        serviceName,
        method,
        payload: payloadStr,
        pubkey,
      } = tx.getTransaction;

      const caller: string = utils
        .addressFromPublicKey(utils.toBuffer(pubkey))
        .toString('hex');

      const receipt = receipts[i]?.getReceipt;

      addresses.add(caller);

      let transfer: AssetTransferCreateWithoutTransactionInput | null = null;
      if (serviceName === 'asset' && method === 'transfer') {
        const payload = safeJSONParse<{
          asset_id: string;
          to: string;
          value: BigNumber;
        }>(payloadStr);

        addresses.add(payload.to);
        this.setBalanceTask(caller, payload.asset_id);
        this.setBalanceTask(payload.to, payload.asset_id);

        transfer = {
          asset: { connect: { assetId: payload.asset_id } },
          value: payload.value.toString(16),
          from: { connect: { address: caller } },
          to: { connect: { address: payload.to } },
        };
      }

      let asset: AssetCreateWithoutTransactionInput | null = null;
      if (
        receipt &&
        !receipt.response.isError &&
        serviceName === 'asset' &&
        method === 'create_asset'
      ) {
        const payload = safeJSONParse<{
          supply: BigNumber;
          symbol: string;
          name: string;
          id: string;
        }>(receipt.response.ret);

        this.setBalanceTask(caller, payload.id);

        asset = {
          account: { connect: { address: caller } },
          assetId: payload.id,
          name: payload.name,
          symbol: payload.symbol,
          supply: payload.supply.toString(16),
        };
      }

      txInput.push({
        ...tx.getTransaction,
        ...(transfer ? { transfer: { create: transfer } } : {}),
        ...(asset ? { createdAsset: { create: asset } } : {}),
        from: {
          connect: {
            address: addressFromPubkey(tx.getTransaction.pubkey),
          },
        },
        receiptIsError: receipt.response.isError,
        receiptRet: receipt.response.ret,
        events: {
          create: receipt.events.map(event => ({
            data: event.data,
            service: event.service,
          })),
        },
      });
    });
  }
}
