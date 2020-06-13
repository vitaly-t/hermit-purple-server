import {
  BlockModel,
  ReceiptModel,
  TransactionModel,
  ValidatorModel,
} from '@muta-extra/common';
import {
  IBlockService,
  IReceiptService,
  IService,
  ITransactionService,
  IValidatorService,
} from '@muta-extra/nexus-schema';
import Knex from 'knex';
import { findMany, findOne, getKnexInstance, TableNames } from '../';

export class DefaultService implements IService {
  blockService: IBlockService;
  receiptService: IReceiptService;
  transactionService: ITransactionService;
  validatorService: IValidatorService;

  constructor(private knex: Knex = getKnexInstance()) {
    this.blockService = {
      async findByHash(txHash) {
        return findOne<BlockModel>(knex, TableNames.BLOCK, {
          blockHash: txHash,
        });
      },
      findByHeight(height) {
        return findOne<BlockModel>(knex, TableNames.BLOCK, { height });
      },
      filter(args) {
        return findMany<BlockModel>(knex, TableNames.BLOCK, {
          page: args?.pageArgs,
          orderBy: ['height', 'desc'],
        });
      },
    };

    this.receiptService = {
      findByTxHash(txHash) {
        return findOne<ReceiptModel>(knex, TableNames.RECEIPT, { txHash });
      },
    };
    this.transactionService = {
      findByTxHash(txHash) {
        return findOne<TransactionModel>(knex, TableNames.TRANSACTION, {
          txHash,
        });
      },
      filter(args) {
        return findMany<TransactionModel>(knex, TableNames.TRANSACTION, {
          page: args?.pageArgs,
          orderBy: ['order', 'desc'],
        });
      },
      filterByBlockHeight(args) {
        return findMany<TransactionModel>(knex, TableNames.TRANSACTION, {
          page: args.pageArgs,
          orderBy: ['order', 'desc'],
          where: { block: args.blockHeight },
        });
      },
    };

    this.validatorService = {
      filterByVersion(version) {
        return findMany<ValidatorModel>(knex, TableNames.BLOCK_VALIDATOR, {
          where: { version },
        });
      },
    };
  }
}
