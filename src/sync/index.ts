import {
  Photon,
  ProofCreateWithoutEpochesInput,
  TransactionCreateWithoutEpochInput,
  ValidatorCreateWithoutEpochesInput,
} from '@prisma/photon';
import { Muta, utils } from 'muta-sdk';
import { Promise as Bluebird } from 'bluebird';
import { MUTA_CHAINID, MUTA_ENDPOINT, SYNC_CONCURRENCY } from '../config';

interface SyncOptions {
  endpoint: string;
  chainId: string;
}

export async function sync(options: SyncOptions) {
  try {
    const photon = new Photon();

    const muta = new Muta({
      endpoint: options.endpoint,
      chainId: options.chainId,
    });
    const rawClient = muta.client.getRawClient();

    const chainLatestEpoch = await rawClient.getEpoch();
    const targetEpochId = chainLatestEpoch.getEpoch.header.epochId;

    const apiLatestEpoch = await photon.epoches.findMany({
      first: 1,
      orderBy: {
        epochId: 'desc',
      },
    });

    let syncEpochId = (apiLatestEpoch[0]?.epochId ?? 0) + 1;
    while (syncEpochId < utils.hexToNum(targetEpochId)) {
      console.log(`start: ${syncEpochId}, end: ${targetEpochId} `);

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
