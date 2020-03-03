import {
  AssetCreateWithoutTransactionInput,
  AssetTransferCreateWithoutTransactionInput,
  TransactionCreateWithoutBlockInput,
} from '@prisma/client';
import { utils } from 'muta-sdk';
import {
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { hexJSON, SourceDataType } from './clean/hex';
import {
  compoundBalance,
  isValidAddressInput,
  isValidHashInput,
} from './utils';

const transferFromSchema = {
  asset_id: SourceDataType.Hash,
  sender: SourceDataType.Address,
  recipient: SourceDataType.Address,
  value: SourceDataType.u64,
};

const transferSchema = {
  asset_id: SourceDataType.Hash,
  to: SourceDataType.Address,
  value: SourceDataType.u64,
};

/**
 * convert public key to address hex string without 0x
 * @param pubkey
 */
export function addressFromPubkey(pubkey: string) {
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

  walk() {
    const { txQuery: txs, receiptQuery: receipts, txInput } = this;

    for (let i = 0; i < txs.length; i++) {
      const tx = txs[i];
      const {
        serviceName,
        method,
        payload: payloadStr,
        pubkey,
      } = tx.getTransaction;

      const from: string = utils
        .addressFromPublicKey(utils.toBuffer(pubkey))
        .toString('hex');

      this.enqueueAddressTask(from);

      const receipt = receipts[i]?.getReceipt;
      const receiptWithoutError = receipt && !receipt.response.isError;

      let transfer: AssetTransferCreateWithoutTransactionInput | null = null;
      if (
        receiptWithoutError &&
        serviceName === 'asset' &&
        method === 'transfer'
      ) {
        const payload = hexJSON(payloadStr, transferSchema);

        this.enqueueAddressTask(payload.to);
        this.enqueueBalanceTask(from, payload.asset_id);
        this.enqueueBalanceTask(payload.to, payload.asset_id);

        transfer = {
          asset: { connect: { assetId: payload.asset_id } },
          value: payload.value,
          from: { connect: { address: from } },
          to: { connect: { address: payload.to } },
        };
      }

      if (
        receiptWithoutError &&
        serviceName === 'asset' &&
        method === 'transfer_from'
      ) {
        const payload = hexJSON(payloadStr, transferFromSchema);

        this.enqueueAddressTask(payload.sender);
        this.enqueueAddressTask(payload.recipient);

        this.enqueueBalanceTask(from, payload.asset_id);
        this.enqueueBalanceTask(payload.sender, payload.asset_id);
        this.enqueueBalanceTask(payload.recipient, payload.asset_id);

        transfer = {
          asset: { connect: { assetId: payload.asset_id } },
          value: payload.value,
          from: { connect: { address: payload.sender } },
          to: { connect: { address: payload.recipient } },
        };
      }

      let asset: AssetCreateWithoutTransactionInput | null = null;
      if (
        receiptWithoutError &&
        serviceName === 'asset' &&
        method === 'create_asset'
      ) {
        const payload = hexJSON(receipt.response.ret, {
          supply: SourceDataType.u64,
          symbol: SourceDataType.String,
          name: SourceDataType.String,
          id: SourceDataType.Hash,
        });

        this.enqueueBalanceTask(from, payload.id);

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
    }
  }

  private enqueueAddressTask(address: string) {
    if (!isValidAddressInput(address)) return;
    this.addresses.add(address);
  }

  private enqueueBalanceTask(address: string, assetId: string) {
    if (!isValidAddressInput(address) || !isValidHashInput(assetId)) return;

    const compounded = compoundBalance(address, assetId);
    if (this.balanceTask.has(compounded)) return;
    this.balanceTask.set(compounded, [address, assetId]);
  }
}
