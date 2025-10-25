// Data Migration Script: From Static Data to MongoDB

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// ===========================================
// MIGRATION SCRIPT
// ===========================================

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cafe-menu');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  description: String,
  available: { type: Boolean, default: true },
  allergens: [String],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// ===========================================
// ORIGINAL DATA (from your data.js)
// ===========================================

const originalMenuData = [
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Bread Oil',
    price: 7.2,
    img: './src/assets/images/menu/bread/Bread_BreadOil.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Calzones',
    price: 4.5,
    img: './src/assets/images/menu/bread/Bread_Calzones.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Cinnamon Roll',
    price: 6.9,
    img: './src/assets/images/menu/bread/Bread_CinnamonRoll.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Pumpkin Bread',
    price: 2.8,
    img: './src/assets/images/menu/bread/Bread_PumpkinBread.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Monkey Bread',
    price: 7.2,
    img: './src/assets/images/menu/bread/Bread_MonkeyBread.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Fruit Bread',
    price: 4.5,
    img: './src/assets/images/menu/bread/Bread_FruitBread.png'
  },
  {
    category: 'Food',
    subcategory: 'bread',
    title: 'Fougasse',
    price: 6.9,
    img: './src/assets/images/menu/bread/Bread_Fougasse.png'
  },
  {
    category: 'Food',
    subcategory: 'sandwich',
    title: 'Ham Sandwich',
    price: 7.2,
    img: './src/assets/images/menu/bread/Bread_HamSandwich.png'
  },
  {
    category: 'Food',
    subcategory: 'sandwich',
    title: 'Turkey Club Sandwich',
    price: 4.5,
    img: './src/assets/images/menu/bread/Bread_TurkeyClubSandwich.png'
  },
  {
    category: 'Food',
    subcategory: 'sandwich',
    title: 'Burritos',
    price: 6.9,
    img: './src/assets/images/menu/bread/Bread_Burritos.png'
  },
  {
    category: 'Food',
    subcategory: 'sandwich',
    title: 'Sandwich',
    price: 2.8,
    img: './src/assets/images/menu/bread/Bread_Sandwich.png'
  },
  {
    category: 'Food',
    subcategory: 'cookie',
    title: 'Cinnamon Cookies',
    price: 7.2,
    img: './src/assets/images/menu/Cookie/Cookie_CinnamonCookies.png'
  },
  {
    category: 'Food',
    subcategory: 'cookie',
    title: 'Chocolate Chip Cookies',
    price: 4.5,
    img: './src/assets/images/menu/Cookie/Cookie_ChocolateChipCookies.png'
  },
  {
    category: 'Food',
    subcategory: 'cookie',
    title: 'Thumbprint',
    price: 6.9,
    img: './src/assets/images/menu/Cookie/Cookie_Thumbprint.png'
  },
  {
    category: 'Food',
    subcategory: 'cookie',
    title: 'Peanut Butter Cookie Cups',
    price: 2.8,
    img: './src/assets/images/menu/Cookie/Cookie_PeanutButterCookieCups.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Almond Frangipane',
    price: 7.2,
    img: './src/assets/images/menu/Cake/Cake_AlmondFrangipane.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Black Tea Cake',
    price: 4.5,
    img: './src/assets/images/menu/Cake/Cake_BlackTeaCake.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Chocolate Cup Cakes',
    price: 6.9,
    img: './src/assets/images/menu/Cake/Cake_ChocolateCupCakes.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Matcha White Chocolate',
    price: 2.8,
    img: './src/assets/images/menu/Cake/Cake_MatchWhiteChocolate.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Red Velvet Royale',
    price: 7.2,
    img: './src/assets/images/menu/Cake/Cake_RedVekvetRoyale.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Banana Walnut Loaf',
    price: 4.5,
    img: './src/assets/images/menu/Cake/Cake_BananaWalnutLoaf.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Chocolate Cheesecake',
    price: 6.9,
    img: './src/assets/images/menu/Cake/Cake_ChocolateCheesecake.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Lemon Drizzle Cake',
    price: 2.8,
    img: './src/assets/images/menu/Cake/Cake_LemonDrizzleCake.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Opera Slice',
    price: 6.9,
    img: './src/assets/images/menu/Cake/Cake_OperaSlice.png'
  },
  {
    category: 'Food',
    subcategory: 'cake',
    title: 'Tiramisu Delight',
    price: 2.8,
    img: './src/assets/images/menu/Cake/Cake_TiramisuDelight.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Americano',
    price: 3.8,
    img: './src/assets/images/menu/coffee/coffee_Americano.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Cappuccino',
    price: 3.8,
    img: './src/assets/images/menu/coffee/coffee_Cappuccino.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Cold Brew',
    price: 3,
    img: './src/assets/images/menu/coffee/coffee_Coldbrew.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Expresso',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Expresso.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Flatwhite',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Flatwhite.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Frappe',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Frappe.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Irsh Coffee',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Irshcoffee.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Latte',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Latte.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Long Black',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Longblack.png'
  },
  {
    category: 'Drinks',
    subcategory: 'coffee',
    title: 'Mocha',
    price: 2.5,
    img: './src/assets/images/menu/coffee/coffee_Mocha.png'
  },
  {
    category: 'Drinks',
    subcategory: 'tea',
    title: 'Black Tea',
    price: 2.5,
    img: './src/assets/images/menu/tea/tea_Blacktea.png'
  },
  {
    category: 'Drinks',
    subcategory: 'tea',
    title: 'Ginger Tea',
    price: 2.5,
    img: './src/assets/images/menu/tea/tea_Gingertea.png'
  },
  {
    category: 'Drinks',
    subcategory: 'tea',
    title: 'Green Tea',
    price: 2.5,
    img: './src/assets/images/menu/tea/tea_Greentea.png'
  },
  {
    category: 'Drinks',
    subcategory: 'tea',
    title: 'White Tea',
    price: 2.5,
    img: './src/assets/images/menu/tea/tea_Whitetea.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Beatroot',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Beatroot.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Kiwi',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Kiwi.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Lemonada',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Lemonada.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Mongo',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Mongo.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Orange',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Orange.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Tomato',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Tomato.png'
  },
  {
    category: 'Drinks',
    subcategory: 'juice',
    title: 'Watermelon',
    price: 2.5,
    img: './src/assets/images/menu/juice/juice_Watermelon.png'
  }
];

// ===========================================
// ENHANCED DATA TRANSFORMATION
// ===========================================

const enhanceMenuData = (originalData) => {
  return originalData.map(item => {
    // Add enhanced fields based on category and subcategory
    const enhancedItem = {
      ...item,
      available: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add descriptions based on item type
    if (item.category === 'Food') {
      switch (item.subcategory) {
        case 'bread':
          enhancedItem.description = `Fresh baked ${item.title.toLowerCase()}`;
          enhancedItem.allergens = ['gluten'];
          enhancedItem.tags = ['fresh', 'baked'];
          break;
        case 'sandwich':
          enhancedItem.description = `Delicious ${item.title.toLowerCase()}`;
          enhancedItem.allergens = ['gluten'];
          enhancedItem.tags = ['sandwich', 'lunch'];
          break;
        case 'cookie':
          enhancedItem.description = `Sweet ${item.title.toLowerCase()}`;
          enhancedItem.allergens = ['gluten', 'dairy'];
          enhancedItem.tags = ['sweet', 'dessert'];
          break;
        case 'cake':
          enhancedItem.description = `Delicious ${item.title.toLowerCase()}`;
          enhancedItem.allergens = ['gluten', 'dairy', 'eggs'];
          enhancedItem.tags = ['dessert', 'sweet'];
          break;
      }
    } else if (item.category === 'Drinks') {
      switch (item.subcategory) {
        case 'coffee':
          enhancedItem.description = `Premium ${item.title.toLowerCase()}`;
          enhancedItem.allergens = [];
          enhancedItem.tags = ['hot', 'caffeine'];
          break;
        case 'tea':
          enhancedItem.description = `Refreshing ${item.title.toLowerCase()}`;
          enhancedItem.allergens = [];
          enhancedItem.tags = ['hot', 'herbal'];
          break;
        case 'juice':
          enhancedItem.description = `Fresh ${item.title.toLowerCase()} juice`;
          enhancedItem.allergens = [];
          enhancedItem.tags = ['cold', 'fresh', 'healthy'];
          break;
      }
    }

    return enhancedItem;
  });
};

// ===========================================
// MIGRATION FUNCTIONS
// ===========================================

const clearExistingData = async () => {
  try {
    await MenuItem.deleteMany({});
    console.log('Cleared existing menu data');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

const migrateData = async () => {
  try {
    console.log('Starting data migration...');
    
    // Clear existing data
    await clearExistingData();
    
    // Enhance and transform data
    const enhancedData = enhanceMenuData(originalMenuData);
    
    // Insert new data
    const result = await MenuItem.insertMany(enhancedData);
    console.log(`Successfully migrated ${result.length} menu items`);
    
    // Verify migration
    const count = await MenuItem.countDocuments();
    console.log(`Total items in database: ${count}`);
    
    // Show sample data
    const sampleItems = await MenuItem.find().limit(3);
    console.log('Sample migrated items:', sampleItems);
    
  } catch (error) {
    console.error('Migration error:', error);
  }
};

const verifyMigration = async () => {
  try {
    console.log('\n=== Migration Verification ===');
    
    // Count by category
    const foodCount = await MenuItem.countDocuments({ category: 'Food' });
    const drinksCount = await MenuItem.countDocuments({ category: 'Drinks' });
    console.log(`Food items: ${foodCount}`);
    console.log(`Drinks items: ${drinksCount}`);
    
    // Count by subcategory
    const subcategories = await MenuItem.aggregate([
      { $group: { _id: '$subcategory', count: { $sum: 1 } } }
    ]);
    console.log('\nItems by subcategory:');
    subcategories.forEach(sub => {
      console.log(`  ${sub._id}: ${sub.count} items`);
    });
    
    // Price statistics
    const priceStats = await MenuItem.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      }
    ]);
    console.log('\nPrice statistics:', priceStats[0]);
    
  } catch (error) {
    console.error('Verification error:', error);
  }
};

// ===========================================
// MAIN MIGRATION SCRIPT
// ===========================================

const runMigration = async () => {
  try {
    await connectDB();
    await migrateData();
    await verifyMigration();
    console.log('\nMigration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = {
  connectDB,
  migrateData,
  verifyMigration,
  enhanceMenuData,
  MenuItem
};
