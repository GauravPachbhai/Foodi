import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  
  username:{
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  restaurantName:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  role:{
    type: String,
    default: 'restaurant'
  },
  verifyCode: {
    type: String,
    required: [true, 'Verify Code is required'],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, 'Verify Code Expiry is required'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
