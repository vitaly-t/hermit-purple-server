import { Asset, Balance } from '@hermit/generated/schema';
import {
  BLOCK,
  EVENT,
  RECEIPT,
  TRANSACTION,
  BLOCK_VALIDATOR,
  ASSET,
  TRANSFER,
  BALANCE,
  ACCOUNT,
} from '@hermit/impl/db/mysql/constants';
import { receiptAssetToDBAsset } from '@hermit/impl/helpers/AssetHelper';
import { TransactionResolver } from '@hermit/impl/sync/TransactionResolver';
import { readonlyAssetService } from '@hermit/muta';
import { Synchronizer, BlockSynchronizer } from '@hermit/sync';
import { hexAddress } from '@hermit/sync/clean/hex';
import { Block } from '@hermit/types/model';
import { knex } from './db/mysql';

const syncAdapter: Synchronizer = {
  async getLocalBlockHeight(): Promise<number> {
    const block = await knex<Block>(BLOCK)
      .select('height')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0]?.height ?? 0;
  },

  async getLocalBlockExecHeight(): Promise<number> {
    const block = await knex<Block>(BLOCK)
      .select('execHeight')
      .orderBy('height', 'desc')
      .limit(1);

    return block[0].execHeight ?? 0;
  },

  async onGenesis() {
    const receipt = await readonlyAssetService.get_native_asset();

    const asset = receiptAssetToDBAsset(
      receipt.ret,
      // There is no txHash in the genesis block, this is a virtual txHash
      '0000000000000000000000000000000000000000000000000000000000000000',
    );
    await knex<Asset>(ASSET).insert(asset);
    await knex<Balance>(BALANCE).insert({
      account: hexAddress(receipt.ret.issuer),
      balance: asset.supply,
      asset: asset.assetId,
      id: 1,
    });
  },

  async onBlockPacked(): Promise<void> {},

  async onBlockExecuted(executed): Promise<void> {
    await knex.transaction(async trx => {
      await trx<Block>(BLOCK).insert(executed.getBlock());
      const transactions = executed.getTransactions();
      const receipts = executed.getReceipts();

      await knex.batchInsert(TRANSACTION, transactions).transacting(trx);
      await knex.batchInsert(RECEIPT, receipts).transacting(trx);
      await knex.batchInsert(EVENT, executed.getEvents()).transacting(trx);

      for (let validator of executed.getValidators()) {
        await knex
          .insert(validator)
          .into(BLOCK_VALIDATOR)
          .onDuplicateUpdate('address', 'version')
          .transacting(trx);
      }

      if (transactions.length === 0) return;

      const resolver = new TransactionResolver({
        transactions,
        receipts,
        height: executed.height(),
        timestamp: executed.getBlock().timestamp,
      });
      await resolver.resolve();

      const createdAssets = resolver.getCreatedAssets();

      for (let asset of createdAssets) {
        await knex
          .insert(asset)
          .into(ASSET)
          .onDuplicateUpdate('assetId')
          .transacting(trx);
      }

      const transfers = resolver.getTransfers();
      if (transfers.length) {
        await knex.batchInsert(TRANSFER, transfers).transacting(trx);
      }

      const balances = resolver.getBalances();
      for (let balance of balances) {
        await knex
          .insert(balance)
          .into(BALANCE)
          .onDuplicateUpdate('account', 'asset')
          .transacting(trx);
      }

      const accounts = resolver.getRelevantAccount();

      for (let account of accounts) {
        await knex
          .insert(account)
          .into(ACCOUNT)
          .onDuplicateUpdate('address')
          .transacting(trx);
      }
    });
  },
};

new BlockSynchronizer(syncAdapter).run();
