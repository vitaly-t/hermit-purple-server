require('dotenv').config();

import { Executed } from '@hermit/sync/model/Executed';
import { Packed } from '@hermit/sync/model/Packed';

export { BlockSynchronizer } from './BlockSynchronizer';

export interface Synchronizer {
  getLocalBlockHeight(): Promise<number>;

  getLocalBlockExecHeight(): Promise<number>;

  onGenesis(): Promise<void>;

  onBlockPacked(packed: Packed): Promise<void>;

  onBlockExecuted(executed: Executed): Promise<void>;
}
