import { Hash } from "@mutajs/types";

export interface EventModel {
  service: string;
  data: string;
  txHash: Hash;
}