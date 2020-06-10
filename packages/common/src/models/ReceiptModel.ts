import { Hash, Uint64 } from "@mutajs/types";

export interface ReceiptModel {
  block: number;
  txHash: Hash;
  isError: boolean;
  ret: string;
  cyclesUsed: Uint64;
}