const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
require('dotenv').config();

const createSampleOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pixel-mart');
    
    // Get admin user and some products
    const adminUser = await User.findOne({ email: 'admin@pixelmart.com' });
    const products = await Product.find().limit(5);
    
    if (!adminUser || products.length === 0) {
      console.log('Admin user or products not found. Please create them first.');
      process.exit(1);
    }

    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Create sample orders
    const sampleOrders = [
      {
        user: adminUser._id,
        items: [
          {
            product: products[0]._id,
            title: products[0].title,
            price: products[0].price,
            quantity: 1,
            image: products[0].image
          },
          {
            product: products[1]._id,
            title: products[1].title,
            price: products[1].price,
            quantity: 2,
            image: products[1].image
          }
        ],
        total: products[0].price + (products[1].price * 2),
        status: 'pending',
        shippingAddress: {
          fullName: 'Admin User',
          addressLine1: '123 Gaming Street',
          city: 'Game City',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
      },
      {
        user: adminUser._id,
        items: [
          {
            product: products[2]._id,
            title: products[2].title,
            price: products[2].price,
            quantity: 1,
            image: products[2].image
          }
        ],
        total: products[2].price,
        status: 'processing',
        shippingAddress: {
          fullName: 'Admin User',
          addressLine1: '123 Gaming Street',
          city: 'Game City',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'PayPal',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      },
      {
        user: adminUser._id,
        items: [
          {
            product: products[3]._id,
            title: products[3].title,
            price: products[3].price,
            quantity: 1,
            image: products[3].image
          },
          {
            product: products[4]._id,
            title: products[4].title,
            price: products[4].price,
            quantity: 1,
            image: products[4].image
          }
        ],
        total: products[3].price + products[4].price,
        status: 'completed',
        shippingAddress: {
          fullName: 'Admin User',
          addressLine1: '123 Gaming Street',
          city: 'Game City',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'Credit Card',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      }
    ];

    const orders = await Order.insertMany(sampleOrders);
    console.log(`Created ${orders.length} sample orders successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error creating sample orders:', error);
    process.exit(1);
  }
};

createSampleOrders();
