const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Product title is required'], 
    trim: true 
  },
  name: { 
    type: String, 
    trim: true 
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  images: [
    {
      url: String,
      alt: String
    }
  ],
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Stock cannot be negative']
  },
  category: {
    type: String,
    required: true,
    default: 'Game'
  },
  platform: [{
    type: String,
    enum: ['PS5', 'PS4', 'Xbox Series X|S', 'Xbox One', 'Nintendo Switch', 'PC', 'Multiple', 'Other'],
    default: 'PC'
  }],
  genre: {
    type: String,
    enum: ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing', 'FPS', 'Horror', 'Other'],
    default: 'Other'
  },
  publisher: {
    type: String,
    default: 'Independent'
  },
  developer: {
    type: String,
    default: 'Independent'
  },
  releaseDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  ageRating: {
    type: String,
    enum: ['E', 'E10+', 'T', 'M', 'A', 'RP'],
    default: 'RP'
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create virtual for 'id' field to match frontend expectations
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

productSchema.virtual('productId').get(function() {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Product', productSchema);
