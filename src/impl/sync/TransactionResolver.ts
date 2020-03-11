import {
  Account as DBAccount,
  Asset as DBAsset,
  Balance as DBBalance,
  Transfer as DBTransfer,
} from '@hermit/generated/schema';
import { hexJSONParse, hexU64, SourceDataType } from '@hermit/sync/clean/hex';
import { readonlyAssetService } from '@hermit/sync/muta';
import { Receipt, Transaction } from '@hermit/types/model';
import { toHex } from '@hermit/utils';
import { utils } from 'muta-sdk';
import { Uint64 } from 'muta-sdk/build/main/types/scalar';

export type Transfer = Omit<DBTransfer, 'id'>;
export type Balance = Omit<DBBalance, 'id'>;
type TransactionWithoutOrder = Omit<Transaction, 'order'>;

interface TransactionResolverOptions {
  height: number;
  timestamp: Uint64;
  transactions: TransactionWithoutOrder[];
  receipts: Receipt[];
}

export class TransactionResolver {
  private readonly txs: TransactionWithoutOrder[];

  private readonly receipts: Receipt[];

  private readonly transfers: Transfer[];

  private readonly assets: DBAsset[];

  private readonly balances: Balance[];

  private readonly accounts: Set<string>;

  /**
   * This set is used to ensure that the balance
   * will not be updated repeatedly
   */
  private readonly balanceTask: Set<string>; // address + assetId
  private readonly height: number;
  private readonly timestamp: string;

  constructor(options: TransactionResolverOptions) {
    const { transactions, receipts, height, timestamp } = options;
    this.height = height;
    this.timestamp = timestamp;
    this.txs = transactions;
    this.receipts = receipts;

    this.transfers = [];
    this.assets = [];
    this.balances = [];
    this.balanceTask = new Set();
    this.accounts = new Set();
  }

  async resolve() {
    await this.walk();
  }

  getRelevantAccount(): DBAccount[] {
    return Array.from(this.accounts).map(address => ({ address }));
  }

  getCreatedAssets(): DBAsset[] {
    return this.assets;
  }

  getTransfers(): Transfer[] {
    return this.transfers;
  }

  getBalances(): Balance[] {
    return this.balances;
  }

  private enqueueTransfer(transfer: Transfer) {
    this.transfers.push(transfer);
  }

  private enqueueAsset(asset: DBAsset) {
    this.assets.push(asset);
  }

  private async enqueueBalance(address: string, assetId: string) {
    this.accounts.add(address);
    if (this.balanceTask.has(address + assetId)) {
      return;
    }
    this.balanceTask.add(address + assetId);

    const res = await readonlyAssetService.get_balance({
      user: toHex(address),
      asset_id: toHex(assetId),
    });

    this.balances.push({
      account: address,
      asset: assetId,
      balance: hexU64(res.ret.balance),
    });
  }

  private async walk() {
    const { txs, receipts } = this;

    const len = txs.length;

    for (let i = 0; i < len; i++) {
      const tx = txs[i];
      const receipt = receipts[i];

      const txHash = tx.txHash;
      const from: string = utils
        .addressFromPublicKey(utils.toBuffer(tx.pubkey))
        .toString('hex');

      const { serviceName, method, payload: payloadStr } = tx;
      if (receipt.isError || serviceName !== 'asset') return;

      if (method === 'transfer') {
        const payload = hexJSONParse(payloadStr, {
          asset_id: SourceDataType.Hash,
          to: SourceDataType.Address,
          value: SourceDataType.u64,
        });

        this.enqueueTransfer({
          asset: payload.asset_id,
          from,
          to: payload.to,
          txHash,
          value: payload.value,
          block: this.height,
          timestamp: this.timestamp,
        });

        this.enqueueBalance(from, payload.asset_id);
        this.enqueueBalance(payload.to, payload.asset_id);
      }

      if (method === 'transfer_from') {
        const payload = hexJSONParse(payloadStr, {
          asset_id: SourceDataType.Hash,
          sender: SourceDataType.Address,
          recipient: SourceDataType.Address,
          value: SourceDataType.u64,
        });

        this.enqueueTransfer({
          asset: payload.asset_id,
          from,
          to: payload.recipient,
          txHash,
          value: payload.value,
          block: this.height,
          timestamp: this.timestamp,
        });

        this.enqueueBalance(from, payload.asset_id);
        this.enqueueBalance(payload.recipient, payload.asset_id);
        this.enqueueBalance(payload.sender, payload.asset_id);
      }

      if (method === 'create_asset') {
        const payload = hexJSONParse(receipt.ret, {
          supply: SourceDataType.u64,
          symbol: SourceDataType.String,
          name: SourceDataType.String,
          id: SourceDataType.Hash,
        });

        this.enqueueAsset({
          assetId: payload.id,
          name: payload.name,
          symbol: payload.symbol,
          supply: payload.supply,
          account: from,
          txHash,
        });

        this.enqueueBalance(from, payload.id);
      }
    }
  }
}
