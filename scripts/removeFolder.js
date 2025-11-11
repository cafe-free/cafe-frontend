// remove-img-folder.js
import mongoose from 'mongoose';
import './envConfig.js';

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB');

  const menuSchema = new mongoose.Schema({
    category: String,
    subcategory: String,
    title: String,
    price: Number,
    img: String,
  }, { collection: 'menus' });

  const Menu = mongoose.model('Menu', menuSchema);

  // Helper: extract filename from a path (handles forward/back slashes)
  function basename(path) {
    if (!path || typeof path !== 'string') return path;
    // Remove any trailing slash, then split by slash/backslash and take last part
    const trimmed = path.replace(/[\\/]+$/, '');
    const parts = trimmed.split(/[\\/]/);
    return parts[parts.length - 1] || trimmed;
  }

  try {
    const cursor = Menu.find({ img: { $type: 'string' } }).cursor();
    let updated = 0;
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      const orig = doc.img;
      const filename = basename(orig);
      if (filename !== orig) {
        doc.img = filename;
        await doc.save();
        updated++;
        console.log(`Updated _id=${doc._id}: "${orig}" -> "${filename}"`);
      }
    }

    console.log(`Done. Documents updated: ${updated}`);
  } catch (err) {
    console.error('Error:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected');
  }
}

main();