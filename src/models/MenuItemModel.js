// models/MenuItem.js
import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String, // e.g., 'Main Course', 'Drinks', etc.
  },
  image: {
    type: String, // URL to the image of the item
  },
  available: {
    type: Boolean,
    default: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true, // Reference to the restaurant that owns this item
  },
});

const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;
