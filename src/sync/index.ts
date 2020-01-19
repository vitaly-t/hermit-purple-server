import {
  Photon,
  ProofCreateWithoutEpochesInput,
  TransactionCreateWithoutEpochInput,
  ValidatorCreateWithoutEpochesInput,
} from '@prisma/photon';
import { utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { debug } from 'debug';
import { MUTA_CHAINID, MUTA_ENDPOINT, SYNC_CONCURRENCY } from '../config';
import { muta } from '../muta';

const debugEpoch = debug('sync:epoch');
const debugReceipt = debug('sync:receipt');

const rawClient = muta.client.getRawClient();
const photon = new Photon();

interface SyncOptions {
  endpoint: string;
  chainId: string;
}

export async function syncReceipt() {
  const receipt = await photon.receipts.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      epoch: true,
    },
    first: 1,
  });

  const executedEpochId = receipt[0]?.epoch?.epochId ?? 1;

  const target = await photon.epoches.findMany({
    where: {
      epochId: {
        gt: executedEpochId,
      },
      transactionsCount: {
        gt: 0,
      },
    },
    include: {
      transactions: true,
    },
  });

  debugReceipt(`last sync receipt epoch ${executedEpochId}`);

  const epoch = target[0];
  if (!epoch) return;

  const txHashs = epoch.transactions.map(x => x.txHash);
  debugReceipt(` now sync ${epoch.epochId} with ${txHashs.length} txs`);

  await Bluebird.all(txHashs).map(
    async txHash => {
      const chainReceipt = await rawClient.getReceipt({
        txHash,
      });
      const r = chainReceipt.getReceipt;
      await photon.receipts.create({
        data: {
          epoch: {
            connect: {
              epochId: epoch.epochId,
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

export async function sync(options: SyncOptions) {
  try {
    const chainLatestEpoch = await rawClient.getEpoch();
    const latestEpochId = chainLatestEpoch.getEpoch.header.epochId;

    const apiLatestEpoch = await photon.epoches.findMany({
      first: 1,
      orderBy: {
        epochId: 'desc',
      },
    });

    let syncEpochId = (apiLatestEpoch[0]?.epochId ?? 0) + 1;

    // HACK: backward 15 epoch to ensure epochs are executed
    let targetEpochId = utils.hexToNum(latestEpochId) - 15;
    if (targetEpochId < 1) targetEpochId = 1;
    while (syncEpochId < targetEpochId) {
      debugEpoch(`start: ${syncEpochId}, end: ${targetEpochId} `);

      const epoch = await rawClient.getEpoch({
        epochId: utils.toHex(syncEpochId),
      });
      const header = epoch.getEpoch.header;
      const orderedTxHashes = epoch.getEpoch.orderedTxHashes;

      const txs = await Bluebird.all(orderedTxHashes).map(
        txHash => rawClient.getTransaction({ txHash }),
        { concurrency: SYNC_CONCURRENCY },
      );

      const transactions: TransactionCreateWithoutEpochInput[] = txs.map(
        tx => ({ ...tx.getTransaction }),
      );

      const validators: ValidatorCreateWithoutEpochesInput[] = header.validators.map(
        v => ({ ...v }),
      );

      await Promise.all(
        validators.map(v =>
          photon.validators.upsert({
            where: {
              address: v.address,
            },
            create: {
              address: v.address,
              proposeWeight: v.proposeWeight,
              voteWeight: v.voteWeight,
            },
            update: {},
          }),
        ),
      );

      const proof: ProofCreateWithoutEpochesInput = {
        ...header.proof,
        epochId: utils.hexToNum(header.proof.epochId),
        round: utils.hexToNum(header.proof.round),
      };

      await photon.epoches.create({
        data: {
          epochId: utils.hexToNum(header.epochId),
          transactionsCount: orderedTxHashes.length,
          transactions: {
            create: transactions,
          },
          timestamp: new Date(Number(utils.hexToNum(header.timestamp) + '000')),
          orderRoot: header.orderRoot,
          stateRoot: header.stateRoot,
          proposer: header.proposer,
          proof: {
            create: proof,
          },
          preHash: header.preHash,
          validatorVersion: header.validatorVersion,
          validators: {
            connect: validators.map(v => ({ address: v.address })),
          },
        },
      });

      await syncReceipt();

      syncEpochId++;
    }
  } catch (e) {
    console.error(e);
    await sync(options);
  }

  await Bluebird.delay(500);
  sync(options);
}

sync({
  endpoint: MUTA_ENDPOINT,
  chainId: MUTA_CHAINID,
});
