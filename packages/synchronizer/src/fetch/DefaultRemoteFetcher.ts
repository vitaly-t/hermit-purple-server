import { Client } from '@mutajs/client';
import { getSdk } from '@mutajs/client-raw';
import { defaults } from 'lodash';
import {
  IFetchRemoteAdapter,
  WholeBlock,
} from '../synchronizer/ISynchronizerAdapter';
import { Pool, spawn, Worker } from 'threads';
import { fetchWholeBlock } from './fetch';
import { envNum } from '@muta-extra/common';

interface FetcherOptions {
  concurrency: number;
  maxPreFetchBlocks: number;
}

export class DefaultRemoteFetcher implements IFetchRemoteAdapter {
  private rawClient: ReturnType<typeof getSdk>;

  private options: FetcherOptions;

  private taskPool: Pool<any>;
  private blockTasks: Map<number, Promise<WholeBlock>> = new Map();

  constructor(
    client: Client = new Client(),
    options?: Partial<FetcherOptions>,
  ) {
    this.rawClient = client.getRawClient();

    this.options = defaults<any, FetcherOptions>(options, {
      concurrency: envNum('HERMIT_FETCH_CONCURRENCY', 20),
      maxPreFetchBlocks: envNum('HERMIT_MAX_PREFETCH_SIZE', 5),
    });

    this.taskPool = Pool(
      () => spawn(new Worker('./fetch.worker')),
      this.options.maxPreFetchBlocks,
    );
  }

  getRemoteBlockHeight = async (): Promise<number> => {
    const block = await this.rawClient.getBlock();
    return Number(block.getBlock.header.height);
  };

  getRemoteBlockExecHeight = async (): Promise<number> => {
    const block = await this.rawClient.getBlock();
    return Number(block.getBlock.header.execHeight);
  };

  private async preFetchRemoteBlocks(fromHeight: number) {
    const remoteHeight = await this.getRemoteBlockExecHeight();

    for (
      let currentPreFetchHeight = fromHeight;
      this.blockTasks.size <= this.options.maxPreFetchBlocks &&
      currentPreFetchHeight <= remoteHeight;
      currentPreFetchHeight++
    ) {
      if (this.blockTasks.has(currentPreFetchHeight)) {
        continue;
      }
      this.blockTasks.set(
        currentPreFetchHeight,
        Promise.resolve(
          this.taskPool.queue<WholeBlock>(function(
            fetchWholeBlock: IFetchRemoteAdapter['getWholeBlock'],
          ): Promise<WholeBlock> {
            return fetchWholeBlock(currentPreFetchHeight);
          }),
        ),
      );
    }
  }

  getWholeBlock = async (height: number): Promise<WholeBlock> => {
    this.preFetchRemoteBlocks(height + 1);

    if (this.blockTasks.has(height)) {
      const task = this.blockTasks.get(height)!;
      this.blockTasks.delete(height);
      return task;
    }

    return fetchWholeBlock(height);
  };
}
