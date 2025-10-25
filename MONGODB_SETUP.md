# MongoDB Setup Guide for Cafe Menu

This guide shows you how to migrate your static menu data to MongoDB and set up a complete backend API.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install express mongoose cors dotenv
npm install -D nodemon
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```env
MONGODB_URI=mongodb://localhost:27017/cafe-menu
PORT=3000
NODE_ENV=development
```

### 3. Database Setup Options

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
# or
sudo apt-get install mongodb   # Ubuntu

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `.env` with your Atlas URI:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-menu
```

### 4. Run Migration

```bash
# Run the migration script
node migration-script.js
```

### 5. Start API Server

```bash
# Start the API server
node api-examples.js
```

## 📊 Database Schema

### Menu Items Collection
```javascript
{
  _id: ObjectId,
  category: "Food" | "Drinks",
  subcategory: "bread" | "coffee" | "tea" | etc.,
  title: String,
  price: Number,
  img: String,
  description: String (optional),
  available: Boolean,
  allergens: [String],
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu/:category` | Get items by category |
| GET | `/api/menu/:category/:subcategory` | Get items by subcategory |
| GET | `/api/menu/search` | Search items with filters |
| GET | `/api/menu/grouped` | Get grouped menu structure |
| POST | `/api/menu` | Create new item (Admin) |
| PUT | `/api/menu/:id` | Update item (Admin) |
| DELETE | `/api/menu/:id` | Delete item (Admin) |

## 🔍 Query Examples

### Search Parameters
```javascript
// Search by text
GET /api/menu/search?q=coffee

// Filter by category
GET /api/menu/search?category=Food

// Price range
GET /api/menu/search?minPrice=2&maxPrice=5

// Exclude allergens
GET /api/menu/search?allergens=gluten,dairy
```

### MongoDB Queries
```javascript
// Get all food items
db.menu_items.find({ category: "Food" })

// Get available items only
db.menu_items.find({ available: true })

// Search by title
db.menu_items.find({ title: { $regex: "coffee", $options: "i" } })

// Price range
db.menu_items.find({ price: { $gte: 2, $lte: 5 } })

// Group by category
db.menu_items.aggregate([
  { $group: { _id: "$category", count: { $sum: 1 } } }
])
```

## 🎯 Frontend Integration

### React Hook Example
```javascript
import { useState, useEffect } from 'react';

const useMenuData = () => {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch('/api/menu');
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
```

### Component Usage
```javascript
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
```

## 🚀 Production Deployment

### 1. Environment Setup
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-menu
PORT=3000
NODE_ENV=production
```

### 2. Add Security Middleware
```javascript
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));
```

### 3. Add Authentication (Optional)
```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Protect admin routes
app.post('/api/menu', authenticateToken, async (req, res) => {
  // Create menu item logic
});
```

## 📈 Performance Optimization

### 1. Database Indexes
```javascript
// Create indexes for better performance
db.menu_items.createIndex({ category: 1 });
db.menu_items.createIndex({ subcategory: 1 });
db.menu_items.createIndex({ available: 1 });
db.menu_items.createIndex({ price: 1 });
db.menu_items.createIndex({ title: "text", description: "text" });
```

### 2. Caching
```javascript
const redis = require('redis');
const client = redis.createClient();

const cacheMenuData = async (req, res, next) => {
  const key = 'menu:all';
  const cached = await client.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  next();
};
```

### 3. Pagination
```javascript
app.get('/api/menu', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const items = await MenuItem.find({ available: true })
    .skip(skip)
    .limit(limit);

  const total = await MenuItem.countDocuments({ available: true });

  res.json({
    items,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});
```

## 🔧 Troubleshooting

### Common Issues

1. **Connection Error**
   ```bash
   # Check if MongoDB is running
   mongosh
   ```

2. **CORS Issues**
   ```javascript
   app.use(cors({
     origin: 'http://localhost:3000',
     credentials: true
   }));
   ```

3. **Environment Variables**
   ```bash
   # Make sure .env file is in project root
   ls -la .env
   ```

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## 🎉 Next Steps

1. Set up your MongoDB database
2. Run the migration script
3. Test the API endpoints
4. Integrate with your frontend
5. Add authentication and security
6. Deploy to production

Happy coding! 🚀
