import { utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { SYNC_CONCURRENCY } from '../config';
import { rawClient } from "./muta";

export async function fetchWholeBlock(height: number) {
  const block = await rawClient.getBlock({
    height: utils.toHex(height),
  });
  const orderedTxHashes = block.getBlock.orderedTxHashes;

  const txs = await Bluebird.all(orderedTxHashes).map(
    txHash => rawClient.getTransaction({ txHash }),
    { concurrency: SYNC_CONCURRENCY },
  );

  const receipts = await Bluebird.all(orderedTxHashes).map(
    txHash => rawClient.getReceipt({ txHash }),
    { concurrency: SYNC_CONCURRENCY },
  );

  return { block, txs, receipts };
}
