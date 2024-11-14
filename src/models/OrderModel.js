// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user who placed the order
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true, // The restaurant where the order was placed
  },
  items: [
    {
      menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true, // Menu item that was ordered
      },
      quantity: {
        type: Number,
        required: true,
        default: 1, // Quantity of the item ordered
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true, // Total price of the order
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'out for delivery', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeliveryPerson', // The delivery person assigned to this order
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the order was created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp for when the order was last updated
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
