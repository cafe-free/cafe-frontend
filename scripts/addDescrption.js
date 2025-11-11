// add-descriptions.js
import mongoose from 'mongoose';
import './envConfig.js';
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// Replace this array with your actual JSON data (only including title and description is necessary)
const items = [
  { title: 'Bread Oil', description: 'Sourdough drizzled with extra virgin olive oil and herbs.' },
  { title: 'Calzones', description: 'Golden folded calzone stuffed with savory fillings.' },
  { title: 'Cinnamon Roll', description: 'Warm cinnamon roll topped with sweet glaze.' },
  { title: 'Pumpkin Bread', description: 'Moist pumpkin loaf spiced with autumn flavours.' },
  { title: 'Monkey Bread', description: 'Pull-apart sweet monkey bread with cinnamon sugar.' },
  { title: 'Fruit Bread', description: 'Loaf studded with mixed dried fruits and citrus zest.' },
  { title: 'Fougasse', description: 'Rustic fougasse with olive oil and aromatic herbs.' },
  { title: 'Ham Sandwich', description: 'Classic ham sandwich on freshly baked bread.' },
  { title: 'Turkey Club Sandwich', description: 'Triple-decker turkey club with crisp lettuce and tomato.' },
  { title: 'Burritos', description: 'Hearty burrito rolled with savory fillings and salsa.' },
  { title: 'Sandwich', description: 'Simple sandwich made for a quick, satisfying bite.' },
  { title: 'Cinnamon Cookies', description: 'Crisp cinnamon cookies dusted with spiced sugar.' },
  { title: 'Chocolate Chip Cookies', description: 'Classic chocolate chunk cookies with gooey centers.' },
  { title: 'Thumbprint', description: 'Buttery thumbprint cookies filled with fruit jam.' },
  { title: 'Peanut Butter Cookie Cups', description: 'Peanut butter cookie cups with a sweet center.' },
  { title: 'Almond Frangipane', description: 'Flaky tart with rich almond frangipane filling.' },
  { title: 'Black Tea Cake', description: 'Light cake infused with aromatic black tea.' },
  { title: 'Chocolate Cup Cakes', description: 'Rich chocolate cupcakes topped with frosting.' },
  { title: 'Matcha White Chocolate', description: 'Matcha sponge cake with white chocolate glaze.' },
  { title: 'Red Velvet Royale', description: 'Velvety red cake layered with cream cheese frosting.' },
  { title: 'Banana Walnut Loaf', description: 'Moist banana loaf studded with crunchy walnuts.' },
  { title: 'Chocolate Cheesecake', description: 'Creamy chocolate cheesecake slice with rich filling.' },
  { title: 'Lemon Drizzle Cake', description: 'Zesty lemon drizzle cake with a sugary finish.' },
  { title: 'Opera Slice', description: 'Layered opera slice with coffee and chocolate notes.' },
  { title: 'Tiramisu Delight', description: 'Classic tiramisu with mascarpone and espresso-soaked sponge.' },
  { title: 'Americano', description: 'Robust Americano brewed from rich espresso shots.' },
  { title: 'Cappuccino', description: 'Creamy cappuccino with steamed milk and foam.' },
  { title: 'Cold Brew', description: 'Smooth cold brew steeped for a clean, mellow taste.' },
  { title: 'Expresso', description: 'Intense single-shot espresso with a rich crema.' },
  { title: 'Flatwhite', description: 'Smooth flat white with silky steamed milk over espresso.' },
  { title: 'Frappe', description: 'Iced frappe blended to a frothy, chilled finish.' },
  { title: 'Irsh Coffee', description: 'Irish-style coffee with warmth and a hint of liqueur.' },
  { title: 'Latte', description: 'Classic latte with steamed milk and a smooth espresso base.' },
  { title: 'Long Black', description: 'Long black made by topping hot water with espresso shots.' },
  { title: 'Mocha', description: 'Chocolate mocha blending espresso and steamed chocolate milk.' },
  { title: 'Black Tea', description: 'Full-bodied black tea brewed to a brisk finish.' },
  { title: 'Ginger Tea', description: 'Warming ginger tea with bright, spicy notes.' },
  { title: 'Green Tea', description: 'Delicate green tea with vegetal, fresh flavors.' },
  { title: 'White Tea', description: 'Light, subtle white tea with floral aroma.' },
  { title: 'Beatroot', description: 'Earthy beetroot juice, fresh-pressed and vibrant.' },
  { title: 'Kiwi', description: 'Tart-sweet kiwi juice with refreshing zing.' },
  { title: 'Lemonada', description: 'Sharp, chilled lemonade with bright citrus notes.' },
  { title: 'Mongo', description: 'Rich mango juice, sweet and tropical.' },
  { title: 'Orange', description: 'Fresh-squeezed orange juice, bright and tangy.' },
  { title: 'Tomato', description: 'Savory tomato juice with a clean, full-bodied taste.' },
  { title: 'Watermelon', description: 'Light watermelon juice, subtly sweet and hydrating.' }
];

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
    price: mongoose.Schema.Types.Mixed,
    img: String,
    description: String,
  }, { collection: 'menus' });

  const Menu = mongoose.model('Menu', menuSchema);

  // Build a map title -> description
  const titleToDesc = new Map();
  for (const it of items) {
    if (it && it.title && typeof it.description === 'string') {
      titleToDesc.set(it.title.trim(), it.description);
    }
  }

  if (titleToDesc.size === 0) {
    console.error('No title->description mappings provided. Exiting.');
    await mongoose.disconnect();
    return;
  }

  try {
    // Prepare bulk operations
    const bulkOps = [];
    for (const [title, description] of titleToDesc.entries()) {
      bulkOps.push({
        updateMany: {
          filter: { title: title },
          update: { $set: { description: description } }
        }
      });
    }

    if (bulkOps.length === 0) {
      console.log('No operations to perform.');
      return;
    }

    // Execute bulkWrite in batches to avoid too large a command
    const BATCH_SIZE = 100;
    let totalMatched = 0;
    let totalModified = 0;

    for (let i = 0; i < bulkOps.length; i += BATCH_SIZE) {
      const batch = bulkOps.slice(i, i + BATCH_SIZE);
      const res = await Menu.collection.bulkWrite(batch, { ordered: false });
      // bulkWrite returns different fields depending on server version; safeguard reading counts
      totalMatched += res.matchedCount || res.nMatched || 0;
      totalModified += res.modifiedCount || res.nModified || 0;
      console.log(`Batch ${i / BATCH_SIZE + 1}:`, res);
    }

    console.log(`Done. Total matched: ${totalMatched}, total modified: ${totalModified}`);
  } catch (err) {
    console.error('Error during update:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

main();