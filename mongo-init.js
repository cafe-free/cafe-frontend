// MongoDB Initialization Script
// This script runs when MongoDB container starts for the first time

// Switch to the cafe-menu database
db = db.getSiblingDB('cafe-menu');

// Create a user for the application
db.createUser({
  user: 'cafe-user',
  pwd: 'cafe-password',
  roles: [
    {
      role: 'readWrite',
      db: 'cafe-menu'
    }
  ]
});

// Create the menu_items collection
db.createCollection('menu_items');

// Create indexes for better performance
db.menu_items.createIndex({ category: 1, subcategory: 1 });
db.menu_items.createIndex({ available: 1 });
db.menu_items.createIndex({ price: 1 });
db.menu_items.createIndex({ title: "text", description: "text" });
db.menu_items.createIndex({ createdAt: 1 });

// Insert sample data
db.menu_items.insertMany([
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
  },
  {
    category: "Drinks",
    subcategory: "coffee",
    title: "Cappuccino",
    price: 3.8,
    img: "./src/assets/images/menu/coffee/coffee_Cappuccino.png",
    description: "Espresso with steamed milk foam",
    available: true,
    allergens: ["dairy"],
    tags: ["hot", "espresso", "milk"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('Database initialization completed successfully!');
print('Created database: cafe-menu');
print('Created user: cafe-user');
print('Created collection: menu_items');
print('Inserted sample data');
