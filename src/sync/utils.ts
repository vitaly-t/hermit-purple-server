import { utils } from 'muta-sdk';

export function compoundBalance(address: string, assetId: string) {
  return utils.hash(address + assetId);
}
