const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Product name is required'], 
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
    enum: ['games', 'consoles', 'accessories', 'merchandise', 'controllers', 'pc-gaming'],
    default: 'games'
  },
  platform: {
    type: String,
    required: true,
    enum: ['PS5', 'PS4', 'Xbox Series X|S', 'Xbox One', 'Nintendo Switch', 'PC', 'Multiple', 'Other'],
    default: 'Other'
  },
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
    type: Date
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

module.exports = mongoose.model('Product', productSchema);
