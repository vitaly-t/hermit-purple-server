import { Address, Uint64 } from "@mutajs/types";

export interface ValidatorModel {
  address: Address;
  proposeWeight: number;
  voteWeight: number;
  version: Uint64;
}