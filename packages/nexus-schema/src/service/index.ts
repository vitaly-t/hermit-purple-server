import { IBlockService } from './IBlockService';
import { IReceiptService } from './IReceiptService';
import { ITransactionService } from './ITransactionService';
import { IValidatorService } from './IValidatorService';

export interface IService {
  blockService: IBlockService;
  transactionService: ITransactionService;
  receiptService: IReceiptService;
  validatorService: IValidatorService;
}

export {
  IBlockService,
  IReceiptService,
  ITransactionService,
  IValidatorService,
};
