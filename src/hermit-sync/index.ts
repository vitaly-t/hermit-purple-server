import { Packed } from './model/Packed';
import { Executed } from './model/Executed';

export { BlockSynchronizer } from './BlockSynchronizer';

export interface Synchronizer {
  getLocalBlockHeight(): Promise<number>;

  getLocalBlockExecHeight(): Promise<number>;

  onGenesis(): Promise<void>;

  onBlockPacked(packed: Packed): Promise<void>;

  onBlockExecuted(executed: Executed): Promise<void>;
}
