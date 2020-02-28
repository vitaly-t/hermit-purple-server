import {
  TransactionCreateWithoutBlockInput,
  ValidatorCreateWithoutBlocksInput,
} from '@prisma/client';
import * as Knex from 'knex';
import {
  _BlockToValidator,
  Asset,
  AssetTransfer,
  Block,
  Event,
  Transaction,
  TransferHistory,
} from './db/types';
import { prisma } from './index';
import { uniq, keyBy } from 'lodash';
import Bluebird = require('bluebird');

const knex = Knex({
  client: 'pg',
  connection: process.env.POSTGRESQL_URL,
});

export async function saveWholeBlock(
  block: Block,
  transactions: TransactionCreateWithoutBlockInput[],
  validators: ValidatorCreateWithoutBlocksInput[],
) {
  return knex.transaction(async trx => {
    await trx<Block>('Block').insert(block);

    const inputTransactions = transactions.map<Transaction>(tx => ({
      block: block.height,
      from: tx.from?.connect?.address as string,
      cyclesPrice: tx.cyclesPrice,
      cyclesLimit: tx.cyclesLimit,
      cyclesUsed: tx.cyclesUsed ?? null,
      timeout: tx.timeout,
      method: tx.method,
      serviceName: tx.serviceName,
      txHash: tx.txHash,
      chainId: tx.chainId,
      nonce: tx.nonce,
      receiptIsError: tx.receiptIsError ?? null,
      payload: tx.payload,
      pubkey: tx.pubkey,
      receiptRet: tx.receiptRet ?? null,
      signature: tx.signature,
    }));

    const transactionOrders = await knex
      .batchInsert('Transaction', inputTransactions)
      .returning('order')
      .transacting(trx);

    const inputEvents = transactions.flatMap<Event>((tx, index) => {
      const events = tx.events?.create;
      if (!events) return [];
      if (Array.isArray(events)) {
        return events.map(event => ({
          receipt: transactionOrders[index],
          data: event.data,
          service: event.service,
        }));
      } else {
        return [
          {
            receipt: transactionOrders[index],
            data: events.data,
            service: events.service,
          },
        ];
      }
    });

    await knex.batchInsert('Event', inputEvents).transacting(trx);

    // resolve the Transaction as Asset
    const inputAssets = transactions.reduce<Asset[]>((assets, tx, i) => {
      const asset = tx.createdAsset?.create;
      if (!asset) return assets;

      return assets.concat({
        transaction: transactionOrders[i],
        supply: asset.supply,
        account: asset.account?.connect?.address as string,
        assetId: asset.assetId,
        name: asset.name,
        symbol: asset.symbol,
      });
    }, []);

    await knex.batchInsert('Asset', inputAssets).transacting(trx);

    const inputAssetTransfers = transactions.reduce<AssetTransfer[]>(
      (transfers, tx, i) => {
        const transfer = tx.transfer?.create;
        if (!transfer) return transfers;

        return transfers.concat({
          transaction: transactionOrders[i],
          value: transfer.value,
          from: transfer.from.connect?.address as string,
          to: transfer.to.connect?.address as string,
          asset: transfer.asset.connect?.assetId as string,
        });
      },
      [],
    );

    await knex
      .batchInsert('AssetTransfer', inputAssetTransfers)
      .transacting(trx);

    const input_BlockToValidators = validators.reduce<_BlockToValidator[]>(
      (blockValidators, validator) => {
        return blockValidators.concat({
          A: block.height,
          B: validator.address,
        });
      },
      [],
    );

    await knex
      .batchInsert('_BlockToValidator', input_BlockToValidators)
      .transacting(trx);

    const assetIds = uniq(
      inputAssetTransfers.map<string>(transfer => transfer.asset),
    );

    const assets = await Bluebird.all(assetIds).map(assetId => {
      return prisma.asset.findOne({ where: { assetId } });
    });
    const indexedAsset = (keyBy(assets, asset => asset?.assetId) as any) as {
      [key: string]: Asset;
    };

    const inputTransferHistories = inputAssetTransfers.map<TransferHistory>(
      transfer => {
        const index = transactionOrders.findIndex(
          order => order === transfer.transaction,
        );
        const relatedTx = inputTransactions[index];
        const assetId = transfer.asset;
        return {
          assetId,
          value: transfer.value,
          blockHeight: block.height,
          from: transfer.from,
          to: transfer.to,
          service: relatedTx.serviceName,
          method: relatedTx.method,
          receiptIsError: relatedTx.receiptIsError,
          txHash: relatedTx.txHash,
          timestamp: block.timestamp,

          assetName: indexedAsset[assetId].name,
          assetSymbol: indexedAsset[assetId].symbol,
        };
      },
    );

    await knex
      .batchInsert('TransferHistory', inputTransferHistories)
      .transacting(trx);
  });
}
