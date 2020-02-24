import { utils } from 'muta-sdk';

export function compoundBalance(address: string, assetId: string) {
  return utils.keccak(utils.toBuffer(address + assetId)).toString('hex');
}

const ADDRESS_REG = /[0-9a-f]{40}/;
export function isValidAddressInput(address: string) {
  return ADDRESS_REG.test(address);
}

const HASH_REG = /[0-9a-f]{64}/;
export function isValidHashInput(hash: string) {
  return HASH_REG.test(hash);
}
