import { Schema, model, connect, disconnect } from 'mongoose';
import { menuData } from '../lib/data.js';
import './envConfig.js';

// Define the Menu schema
const menuSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the model
const Menu = model('Menu', menuSchema);

async function importData() {
  try {
    const URI = process.env.MONGODB_URI;
    
    if (!URI) {
      console.error('Please provide MONGODB_URI in your environment variables');
      process.exit(1);
    }

    // Connect to MongoDB
    await connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await Menu.deleteMany({});
    console.log('Cleared existing menu items');

    // Import new data
    const result = await Menu.insertMany(menuData);
    console.log(`Successfully imported ${result.length} menu items`);

  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

importData();