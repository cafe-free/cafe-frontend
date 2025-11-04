import mongoose from 'mongoose';
import {} from './envConfig.js';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

async function printDb() {
  // connect
  await mongoose.connect(MONGODB_URI, {
    // options: adjust for your mongoose version if needed
    bufferCommands: false,
  });

  try {
    const db = mongoose.connection.db;

    // list collections
    const collections = await db.listCollections().toArray();
    if (collections.length === 0) {
      console.log('No collections found in the database.');
      return;
    }

    for (const collInfo of collections) {
      const name = collInfo.name;
      console.log(`\n=== Collection: ${name} ===`);

      // fetch up to 10 documents
      const cursor = db.collection(name).find().limit(10);
      const docs = await cursor.toArray();

      if (docs.length === 0) {
        console.log('  (no documents)');
        continue;
      }

      for (const doc of docs) {
        // pretty-print each document
        console.log(JSON.stringify(doc, replacer, 2));
      }
    }
  } finally {
    // close connection
    await mongoose.disconnect();
  }
}

// replacer removes undefined and converts ObjectId/Date to strings for readability
function replacer(_key, value) {
  if (value && typeof value === 'object') {
    // ObjectId handling (works with BSON ObjectId that has toString)
    if (typeof value.toString === 'function' && value._bsontype === 'ObjectID') {
      return value.toString();
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
  }
  return value;
}

printDb()
  .then(() => {
    console.log('\nDone.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error:', err);
    process.exit(1);
  });
