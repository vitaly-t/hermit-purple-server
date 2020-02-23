import { muta } from "../muta";
import { AssetService } from "muta-sdk";

export const client = muta.client();
export const rawClient = client.getRawClient();
export const readonlyAssetService = new AssetService(client);