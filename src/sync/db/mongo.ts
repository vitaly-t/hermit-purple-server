import { Collection, MongoClient } from 'mongodb';
import { Transaction } from './types';

const uri =
  process.env.MONGODB_URL ||
  'mongodb://127.0.0.1:27017/muta?retryWrites=true&w=majority';

let client: MongoClient;
export async function getClient(): Promise<MongoClient> {
  if (!client) {
    client = await MongoClient.connect(uri, { useUnifiedTopology: true });
  }

  return client;
}

export async function getDB() {
  const client = await getClient();
  return client.db('muta');
}

export async function collection<
  Name extends 'transaction' | string,
  Type = any
>(
  collectionName: Name,
): Promise<Collection<Name extends 'transaction' ? Transaction : Type>> {
  const db = await getDB();
  return db.collection(collectionName);
}
