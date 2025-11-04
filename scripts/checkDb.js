import pkg from 'mongoose';
const { connect, connection, disconnect } = pkg;
import './envConfig.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  const uri = MONGODB_URI;

  if (!uri) {
    console.error('No MongoDB URI found. Set MONGODB_URI or export it from scripts/envConfig.js');
    process.exit(2);
  }

  try {
    await connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // keep default options minimal
    });

    const db = connection.db;
    const collections = await db.listCollections().toArray();

    if (!collections.length) {
      console.log('No collections found in database:', db.databaseName);
      await disconnect();
      return;
    }

    let anyData = false;
    for (const { name } of collections) {
      const coll = db.collection(name);
      const count = await coll.countDocuments();
      if (count > 0) {
        anyData = true;
        console.log(`\nCollection: ${name} — ${count} document(s). Showing up to 10 documents:`);
        const docs = await coll.find().limit(10).toArray();
        console.log(JSON.stringify(docs, null, 2));
      } else {
        console.log(`Collection: ${name} — empty`);
      }
    }

    if (!anyData) {
      console.log('\nDatabase contains no data in any collection.');
    }
  } catch (err) {
    console.error('Error checking DB:', err.message || err);
    process.exitCode = 1;
  } finally {
    await disconnect();
  }
}

main();