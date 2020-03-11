import {
  GetBlockQuery,
  GetReceiptQuery,
  GetTransactionQuery,
} from 'muta-sdk/build/main/client/codegen/sdk';
import { Synchronizer } from './';
import { fetchRemoteBlockHeight, fetchWholeBlock } from './fetch';
import { error, info } from './log';
import { Executed } from './model/Executed';
import { client } from './muta';

export class BlockSynchronizer {
  /**
   * current local block height
   */
  private localHeight: number;

  /**
   * latest remote block height
   */
  private remoteHeight: number;

  private synchronizer: Synchronizer;

  constructor(synchronizer: Synchronizer) {
    this.localHeight = 0;
    this.remoteHeight = 0;

    this.synchronizer = synchronizer;
  }

  async run() {
    while (1) {
      try {
        const localHeight = await this.refreshLocalHeight();
        const remoteHeight = await this.refreshRemoteHeight();

        if (localHeight >= remoteHeight) {
          info(
            `local height: ${localHeight}, remote height: ${remoteHeight}, waiting for remote new block`,
          );
          await client.waitForNextNBlock(1);
          continue;
        }

        info(`start: ${localHeight}, end: ${remoteHeight} `);

        const { block, txs, receipts } = await fetchWholeBlock(localHeight);
        await this.onBlockExecuted(block, txs, receipts);
      } catch (e) {
        error(e);
      }
    }
  }

  private async refreshRemoteHeight(): Promise<number> {
    this.remoteHeight = await fetchRemoteBlockHeight();
    return this.remoteHeight;
  }

  private async refreshLocalHeight(): Promise<number> {
    this.localHeight = (await this.synchronizer.getLocalBlockHeight()) + 1;
    return this.localHeight;
  }

  private async onBlockExecuted(
    rawBlock: GetBlockQuery,
    transactions: GetTransactionQuery[],
    receipts: GetReceiptQuery[],
  ) {
    await this.synchronizer.onBlockExecuted(
      new Executed({
        rawBlock,
        rawTransactions: transactions,
        rawReceipts: receipts,
      }),
    );
  }
}
