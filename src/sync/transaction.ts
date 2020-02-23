import {
  AssetCreateWithoutTransactionInput,
  AssetTransferCreateWithoutTransactionInput,
  TransactionCreateWithoutBlockInput,
} from '@prisma/client';
import {
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { utils } from 'muta-sdk';
import { compoundBalance } from './utils';
import { Address } from 'muta-sdk/build/main/types';
import { hexJSON, SourceDataType } from '../utils/hex';

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

  private setAddressTask(address: Address) {
    this.addresses.add(address);
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

      const from: string = utils
        .addressFromPublicKey(utils.toBuffer(pubkey))
        .toString('hex');
      this.setAddressTask(from);

      const receipt = receipts[i]?.getReceipt;

      let transfer: AssetTransferCreateWithoutTransactionInput | null = null;
      if (
        receipt &&
        !receipt.response.isError &&
        serviceName === 'asset' &&
        method === 'transfer'
      ) {
        const payload = hexJSON(payloadStr, {
          asset_id: SourceDataType.Hash,
          to: SourceDataType.String,
          value: SourceDataType.u64,
        });

        this.setAddressTask(payload.to);
        this.setBalanceTask(from, payload.asset_id);
        this.setBalanceTask(payload.to, payload.asset_id);

        transfer = {
          asset: { connect: { assetId: payload.asset_id } },
          value: payload.value,
          from: { connect: { address: from } },
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
        const payload = hexJSON(receipt.response.ret, {
          supply: SourceDataType.u64,
          symbol: SourceDataType.String,
          name: SourceDataType.String,
          id: SourceDataType.Hash,
        });

        this.setBalanceTask(from, payload.id);

        asset = {
          account: { connect: { address: from } },
          assetId: payload.id,
          name: payload.name,
          symbol: payload.symbol,
          supply: payload.supply,
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
        cyclesUsed: receipt.cyclesUsed,
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
