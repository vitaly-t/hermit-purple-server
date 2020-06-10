import { ReceiptModel } from '@muta-extra/common';
import { QueryOneFn } from '../types';

export interface IReceiptService {
  findByTxHash: QueryOneFn<ReceiptModel, string>;
}
