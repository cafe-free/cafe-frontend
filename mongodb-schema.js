// MongoDB Schema and Examples for Cafe Menu Data

// ===========================================
// RECOMMENDED SCHEMA: Single Collection
// ===========================================

// Collection: menu_items
const menuItemSchema = {
  _id: "ObjectId",
  category: "String", // "Food" or "Drinks"
  subcategory: "String", // "bread", "coffee", etc.
  title: "String",
  price: "Number",
  img: "String",
  description: "String", // Optional
  available: "Boolean", // For availability management
  allergens: ["String"], // Optional array
  tags: ["String"], // Optional for filtering
  createdAt: "Date",
  updatedAt: "Date"
};

// ===========================================
// SAMPLE DATA INSERTION
// ===========================================

// Insert sample menu items
const sampleMenuItems = [
  {
    category: "Food",
    subcategory: "bread",
    title: "Bread Oil",
    price: 7.2,
    img: "./src/assets/images/menu/bread/Bread_BreadOil.png",
    description: "Fresh baked bread with olive oil",
    available: true,
    allergens: ["gluten"],
    tags: ["fresh", "traditional"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: "Food",
    subcategory: "bread",
    title: "Calzones",
    price: 4.5,
    img: "./src/assets/images/menu/bread/Bread_Calzones.png",
    description: "Italian stuffed bread",
    available: true,
    allergens: ["gluten", "dairy"],
    tags: ["italian", "stuffed"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    category: "Drinks",
    subcategory: "coffee",
    title: "Americano",
    price: 3.8,
    img: "./src/assets/images/menu/coffee/coffee_Americano.png",
    description: "Espresso with hot water",
    available: true,
    allergens: [],
    tags: ["hot", "espresso"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// ===========================================
// MONGODB QUERIES
// ===========================================

// 1. Get all menu items
const getAllMenuItems = () => {
  return db.menu_items.find({});
};

// 2. Get items by category
const getItemsByCategory = (category) => {
  return db.menu_items.find({ category: category });
};

// 3. Get items by subcategory
const getItemsBySubcategory = (category, subcategory) => {
  return db.menu_items.find({ 
    category: category, 
    subcategory: subcategory 
  });
};

// 4. Get available items only
const getAvailableItems = () => {
  return db.menu_items.find({ available: true });
};

// 5. Search items by title
const searchItems = (searchTerm) => {
  return db.menu_items.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ]
  });
};

// 6. Get items by price range
const getItemsByPriceRange = (minPrice, maxPrice) => {
  return db.menu_items.find({
    price: { $gte: minPrice, $lte: maxPrice }
  });
};

// 7. Get items without specific allergens
const getItemsWithoutAllergens = (allergens) => {
  return db.menu_items.find({
    allergens: { $nin: allergens }
  });
};

// 8. Get grouped menu by category and subcategory
const getGroupedMenu = () => {
  return db.menu_items.aggregate([
    {
      $group: {
      _id: { category: "$category", subcategory: "$subcategory" },
      items: { $push: "$$ROOT" }
    }
  });
};

// ===========================================
// INDEXES FOR PERFORMANCE
// ===========================================

// Create indexes for better performance
db.menu_items.createIndex({ category: 1 });
db.menu_items.createIndex({ subcategory: 1 });
db.menu_items.createIndex({ available: 1 });
db.menu_items.createIndex({ price: 1 });
db.menu_items.createIndex({ title: "text", description: "text" }); // Text search
db.menu_items.createIndex({ category: 1, subcategory: 1 }); // Compound index

// ===========================================
// AGGREGATION PIPELINES
// ===========================================

// Get menu structure with counts
const getMenuStructure = () => {
  return db.menu_items.aggregate([
    {
      $group: {
        _id: { category: "$category", subcategory: "$subcategory" },
        count: { $sum: 1 },
        items: { $push: { title: "$title", price: "$price", img: "$img" } }
      }
    },
    {
      $group: {
        _id: "$_id.category",
        subcategories: {
          $push: {
            name: "$_id.subcategory",
            count: "$count",
            items: "$items"
          }
        }
      }
    }
  ]);
};

// Get price statistics
const getPriceStatistics = () => {
  return db.menu_items.aggregate([
    {
      $group: {
        _id: "$category",
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = {
  sampleMenuItems,
  getAllMenuItems,
  getItemsByCategory,
  getItemsBySubcategory,
  getAvailableItems,
  searchItems,
  getItemsByPriceRange,
  getItemsWithoutAllergens,
  getGroupedMenu,
  getMenuStructure,
  getPriceStatistics
};
