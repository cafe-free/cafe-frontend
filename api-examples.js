// API Integration Examples for MongoDB Menu Data

// ===========================================
// NODE.JS + EXPRESS + MONGODB
// ===========================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/cafe-menu', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
// API ROUTES
// ===========================================

// Get all menu items
app.get('/api/menu', async (req, res) => {
  try {
    const items = await MenuItem.find({ available: true });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get menu items by category
app.get('/api/menu/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const items = await MenuItem.find({ 
      category: category, 
      available: true 
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get menu items by category and subcategory
app.get('/api/menu/:category/:subcategory', async (req, res) => {
  try {
    const { category, subcategory } = req.params;
    const items = await MenuItem.find({ 
      category: category, 
      subcategory: subcategory,
      available: true 
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search menu items
app.get('/api/menu/search', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, allergens } = req.query;
    let query = { available: true };

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (allergens) {
      const allergenArray = allergens.split(',');
      query.allergens = { $nin: allergenArray };
    }

    const items = await MenuItem.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get grouped menu structure
app.get('/api/menu/grouped', async (req, res) => {
  try {
    const groupedMenu = await MenuItem.aggregate([
      { $match: { available: true } },
      {
        $group: {
          _id: { category: "$category", subcategory: "$subcategory" },
          items: { $push: "$$ROOT" }
        }
      },
      {
        $group: {
          _id: "$_id.category",
          subcategories: {
            $push: {
              name: "$_id.subcategory",
              items: "$items"
            }
          }
        }
      }
    ]);
    res.json(groupedMenu);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new menu item (Admin)
app.post('/api/menu', async (req, res) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update menu item (Admin)
app.put('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndUpdate(
      id, 
      { ...req.body, updatedAt: new Date() }, 
      { new: true }
    );
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete menu item (Admin)
app.delete('/api/menu/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByIdAndDelete(id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===========================================
// FRONTEND INTEGRATION (React)
// ===========================================

// React Hook for fetching menu data
const useMenuData = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu data');
        }
        const data = await response.json();
        setMenuData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  return { menuData, loading, error };
};

// React component using the hook
const MenuComponent = () => {
  const { menuData, loading, error } = useMenuData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {menuData.map(item => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <img src={item.img} alt={item.title} />
        </div>
      ))}
    </div>
  );
};

// ===========================================
// MONGODB ATLAS (Cloud) CONNECTION
// ===========================================

// For production with MongoDB Atlas
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// ===========================================
// ENVIRONMENT VARIABLES
// ===========================================

// .env file
/*
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-menu
PORT=3000
NODE_ENV=development
*/

// ===========================================
// PACKAGE.JSON DEPENDENCIES
// ===========================================

/*
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, MenuItem };
