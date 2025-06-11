const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  name: String, 
  quantity: { 
    type: Number, 
    required: true, 
    min: [1, 'Quantity must be at least 1'] 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    state: String,
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'PayPal', 'UPI', 'Cash on Delivery'],
    required: true
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  taxAmount: { type: Number, default: 0.0 },
  shippingFee: { type: Number, default: 0.0 },
  totalAmount: { 
    type: Number, 
    required: true 
  },
  status: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  deliveredAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
