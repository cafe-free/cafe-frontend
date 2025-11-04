import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
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

const Menu = mongoose.models.Menu || mongoose.model('Menu', menuSchema);
export default Menu;