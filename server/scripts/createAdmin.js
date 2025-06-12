const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pixel-mart');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@pixelmart.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@pixelmart.com',
      password: 'admin123',
      isAdmin: true
    });

    console.log('Admin user created successfully:', {
      name: adminUser.name,
      email: adminUser.email,
      isAdmin: adminUser.isAdmin
    });

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
