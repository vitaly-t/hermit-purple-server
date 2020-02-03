import { Promise as Bluebird } from 'bluebird';
import { debug } from 'debug';
import { prisma, rawClient } from './index';

const debugReceipt = debug('sync:receipt');

export async function syncReceipt() {
  const receipt = await prisma.receipt.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      block: true,
    },
    first: 1,
  });

  const executedBlockHeight = receipt[0]?.block?.height ?? 1;

  const target = await prisma.block.findMany({
    where: {
      height: {
        gt: executedBlockHeight,
      },
      transactionsCount: {
        gt: 0,
      },
    },
    include: {
      transactions: true,
    },
  });

  debugReceipt(`last sync receipt block ${executedBlockHeight}`);

  const block = target[0];
  if (!block) return;

  const txHashs = block.transactions.map(x => x.txHash);
  debugReceipt(` now sync ${block.height} with ${txHashs.length} txs`);

  await Bluebird.all(txHashs).map(
    async txHash => {
      const chainReceipt = await rawClient.getReceipt({
        txHash,
      });
      const r = chainReceipt.getReceipt;
      await prisma.receipt.create({
        data: {
          block: {
            connect: {
              height: block.height,
            },
          },
          transaction: {
            connect: {
              txHash,
            },
          },
          cyclesUsed: r.cyclesUsed,
          events: {
            create: r.events.map(x => ({
              data: x.data,
              service: x.service,
            })),
          },
          response: {
            create: {
              isError: r.response.isError,
              ret: r.response.ret,
            },
          },
        },
      });
    },
    { concurrency: 1 },
  );
}
