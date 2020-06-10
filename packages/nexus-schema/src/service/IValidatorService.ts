import { ValidatorModel } from '@muta-extra/common';
import { QueryManyFn } from '../types';

export interface IValidatorService {
  filterByVersion: QueryManyFn<ValidatorModel, string>;
}
