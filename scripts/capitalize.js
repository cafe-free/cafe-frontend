// capitalize-subcategory.js
import mongoose from 'mongoose';
import './envConfig.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');

  // Define a minimal schema for the collection (only need subcategory)
  const menuSchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    title: String,
    price: Number,
    img: String,
  }, { collection: 'menus' });

  const Menu = mongoose.model('Menu', menuSchema);

  // Helper to capitalize first letter without lowercasing the rest
  function capitalizeFirstLetter(str) {
    if (!str || typeof str !== 'string') return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  try {
    // Option A: Update with a cursor (safe for large collections)
    const cursor = Menu.find({ subcategory: { $type: 'string' } }).cursor();
    let updatedCount = 0;
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const orig = doc.subcategory;
      const transformed = capitalizeFirstLetter(orig);
      if (transformed !== orig) {
        doc.subcategory = transformed;
        await doc.save(); // triggers updatedAt if you use timestamps
        updatedCount++;
        console.log(`Updated _id=${doc._id}: "${orig}" -> "${transformed}"`);
      }
    }
    
    console.log(`Done. Documents updated: ${updatedCount}`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

main();