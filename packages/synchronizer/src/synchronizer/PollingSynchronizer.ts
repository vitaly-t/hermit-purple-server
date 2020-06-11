import { Client } from '@mutajs/client';
import { error, info } from '../logger';
import { Executed } from '../models/Executed';
import { RawBlock, RawReceipt, RawTransaction } from '../models/types';
import { ISynchronizerAdapter } from './';

export class PollingSynchronizer {
  /**
   * current local block height
   */
  private localHeight: number;

  /**
   * latest remote block height
   */
  private remoteHeight: number;

  private adapter: ISynchronizerAdapter;

  constructor(
    adapter: ISynchronizerAdapter,
    private client: Client = new Client(),
  ) {
    this.localHeight = 0;
    this.remoteHeight = 0;

    this.adapter = adapter;
  }

  async run() {
    while (1) {
      try {
        const localHeight = await this.refreshLocalHeight();

        if (localHeight === 1) {
          await this.adapter.onGenesis();
        }

        const remoteHeight = await this.refreshRemoteHeight();

        if (localHeight >= remoteHeight) {
          info(
            `local height: ${localHeight}, remote height: ${remoteHeight}, waiting for remote new block`,
          );
          await this.client.waitForNextNBlock(1);
          continue;
        }

        info(`start: ${localHeight}, end: ${remoteHeight} `);

        const { block, txs, receipts } = await this.adapter.getWholeBlock(
          localHeight,
        );
        await this.onBlockExecuted(block, txs, receipts);
      } catch (e) {
        error(e);
      }
    }
  }

  private async refreshRemoteHeight(): Promise<number> {
    this.remoteHeight = await this.adapter.getRemoteBlockHeight();
    return this.remoteHeight;
  }

  private async refreshLocalHeight(): Promise<number> {
    this.localHeight = (await this.adapter.getLocalBlockHeight()) + 1;
    return this.localHeight;
  }

  private async onBlockExecuted(
    rawBlock: RawBlock,
    transactions: RawTransaction[],
    receipts: RawReceipt[],
  ) {
    await this.adapter.onBlockExecuted(
      new Executed({
        rawBlock,
        rawTransactions: transactions,
        rawReceipts: receipts,
      }),
    );
  }
}
