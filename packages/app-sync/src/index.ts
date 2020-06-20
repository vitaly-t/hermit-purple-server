#!/usr/bin/env node
require('@muta-extra/common').loadEnvFile();

import {
  DefaultLocalFetcher,
  DefaultSyncEventHandler,
} from '@muta-extra/knex-mysql';
import {
  DefaultRemoteFetcher,
  IFetchLocalAdapter,
  IFetchRemoteAdapter,
  ISyncEventHandlerAdapter,
  ISynchronizerAdapter,
  PollingSynchronizer,
} from '@muta-extra/synchronizer';

const remoteFetcher: IFetchRemoteAdapter = new DefaultRemoteFetcher();
const localFetcher: IFetchLocalAdapter = new DefaultLocalFetcher();
const eventHandler: ISyncEventHandlerAdapter = new DefaultSyncEventHandler();

const syncAdapter: ISynchronizerAdapter = {
  ...remoteFetcher,
  ...localFetcher,
  ...eventHandler,
};

export function sync() {
  return new PollingSynchronizer(syncAdapter).run();
}

sync();
