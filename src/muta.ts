import { Muta } from 'muta-sdk';
import { MUTA_CHAINID, MUTA_ENDPOINT } from './config';

export const muta = new Muta({
  endpoint: MUTA_ENDPOINT,
  chainId: MUTA_CHAINID,
});
