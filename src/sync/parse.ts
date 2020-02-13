import {
  AssetCreateWithoutCreationTransactionInput,
  AssetTransferCreateWithoutTransactionInput,
  TransactionCreateWithoutBlockInput,
} from '@prisma/client';
import { BigNumber } from 'bignumber.js';
import {
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { utils } from 'muta-sdk';

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

export class BlockTransactionsConverter {
  private readonly addresses: Set<string>;

  constructor() {
    this.addresses = new Set();
  }

  getRelevantAddresses(): Set<string> {
    return new Set(this.addresses);
  }

  convert(
    txs: GetTransactionQuery[],
    receipts: GetReceiptQuery[],
  ): TransactionCreateWithoutBlockInput[] {
    const addresses = this.addresses;

    const transactions: TransactionCreateWithoutBlockInput[] = txs.map(
      (tx, i) => {
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

          transfer = {
            asset: { connect: { assetId: payload.asset_id } },
            value: payload.value.toString(16),
            from: { connect: { address: caller } },
            to: { connect: { address: payload.to } },
          };
        }

        let asset: AssetCreateWithoutCreationTransactionInput | null = null;
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

          asset = {
            issuer: { connect: { address: caller } },
            assetId: payload.id,
            name: payload.name,
            symbol: payload.symbol,
            supply: payload.supply.toString(16),
          };
        }

        return {
          ...tx.getTransaction,
          ...(transfer ? { transfer: { create: transfer } } : {}),
          ...(asset ? { createdAsset: { create: asset } } : {}),
          account: {
            connect: {
              address: addressFromPubkey(tx.getTransaction.pubkey),
            },
          },
          receipt: {
            create: {
              cyclesUsed: receipt.cyclesUsed,
              events: {
                create: receipt.events.map(event => ({
                  data: event.data,
                  service: event.service,
                })),
              },
              response: {
                create: {
                  isError: receipt.response.isError,
                  ret: receipt.response.ret,
                },
              },
            },
          },
        };
      },
    );

    return transactions;
  }
}
