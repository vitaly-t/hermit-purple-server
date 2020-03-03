import { collection } from '../src/sync/db/mongo';

async function up() {
  const transaction = await collection('transaction');
  const orderIndex = await transaction.createIndex('order');
  const fromIndex = await transaction.createIndex('from');

  console.log(`transaction: "order" index created on ${orderIndex} `);
  console.log(`transaction: "from" index created on ${fromIndex} `);
}

up();
