import {
  Block,
  Event,
  Receipt,
  Transaction,
  Validator,
} from '@hermit/hermit-types/model';
import { hexToNum } from '@hermit/hermit-utils/bytes';
import { utils } from 'muta-sdk';
import {
  GetBlockQuery as RawBlock,
  GetReceiptQuery as RawReceipt,
  GetTransactionQuery as RawTransaction,
} from 'muta-sdk/build/main/client/codegen/sdk';

interface ExecutedOption {
  readonly rawBlock: RawBlock;

  readonly rawTransactions: RawTransaction[];

  readonly rawReceipts: RawReceipt[];
}

type TransactionWithoutOrder = Omit<Transaction, 'order'>;

export class Executed {
  private readonly executed: ExecutedOption;

  constructor(executed: ExecutedOption) {
    this.executed = executed;
  }

  height(): number {
    return hexToNum(this.executed.rawBlock.getBlock.header.height);
  }

  execHeight(): number {
    return hexToNum(this.executed.rawBlock.getBlock.header.execHeight);
  }

  getBlock(): Block {
    const {
      rawBlock: rawBlock,
      rawTransactions: rawTransactions,
    } = this.executed;

    const header = rawBlock.getBlock.header;

    return {
      blockHash: rawBlock.getBlock.hash,
      height: hexToNum(header.height),
      execHeight: hexToNum(header.execHeight),
      transactionsCount: rawTransactions.length,
      timestamp: header.timestamp,
      orderRoot: header.orderRoot,
      stateRoot: header.stateRoot,
      proposer: header.proposer,
      proofBitmap: header.proof.bitmap,
      proofRound: header.proof.round,
      proofSignature: header.proof.signature,
      preHash: header.preHash,
      validatorVersion: header.validatorVersion,
    };
  }

  getTransactions(): TransactionWithoutOrder[] {
    const block = hexToNum(this.executed.rawBlock.getBlock.header.height);
    return this.executed.rawTransactions.map<TransactionWithoutOrder>(
      ({ getTransaction: tx }) => ({
        ...tx,
        from: utils.addressFromPublicKey(tx.pubkey).toString('hex'),
        block,
      }),
    );
  }

  getReceipts(): Receipt[] {
    const block = this.height();
    return this.executed.rawReceipts.map<Receipt>(receipt => ({
      block: block,
      txHash: receipt.getReceipt.txHash,
      cyclesUsed: receipt.getReceipt.cyclesUsed,
      isError: receipt.getReceipt.response.isError,
      ret: receipt.getReceipt.response.ret,
    }));
  }

  getEvents(): Event[] {
    return this.executed.rawReceipts.flatMap<Event>(
      ({ getReceipt: receipt }) => {
        const events = receipt.events;
        if (!events || events.length === 0) return [];

        return events.map(e => ({
          service: e.service,
          data: e.data,
          txHash: receipt.txHash,
        }));
      },
    );
  }

  getValidators(): Validator[] {
    return this.executed.rawBlock.getBlock.header.validators.map(address => ({
      version: this.executed.rawBlock.getBlock.header.validatorVersion,
      ...address,
    }));
  }
}
