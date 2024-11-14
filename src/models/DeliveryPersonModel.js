// models/DeliveryPerson.js
import mongoose from 'mongoose';

const DeliveryPersonSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, // The hashed password
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String, // e.g., 'bike', 'car'
  },
  available: {
    type: Boolean,
    default: true, // Whether the delivery person is available for orders
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // List of orders the delivery person is assigned to
    },
  ],
});

const DeliveryPerson = mongoose.models.DeliveryPerson || mongoose.model('DeliveryPerson', DeliveryPersonSchema);

export default DeliveryPerson;
