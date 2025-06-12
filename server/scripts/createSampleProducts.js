const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    title: "Cyberpunk 2077",
    description: "An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    price: 59.99,
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "RPG",
    platform: ["PC", "PS5", "Xbox Series X|S"],
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    stock: 25,
    rating: 4.2,
    releaseDate: "2020-12-10"
  },
  {
    title: "The Witcher 3: Wild Hunt",
    description: "A story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe.",
    price: 39.99,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "RPG",
    platform: ["PC", "PS4", "Xbox One", "Nintendo Switch"],
    developer: "CD Projekt RED",
    publisher: "CD Projekt",
    stock: 15,
    rating: 4.8,
    releaseDate: "2015-05-19"
  },
  {
    title: "Call of Duty: Modern Warfare III",
    description: "The direct sequel to the record-breaking Call of Duty: Modern Warfare II.",
    price: 69.99,
    image: "https://images.pexels.com/photos/3945343/pexels-photo-3945343.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "FPS",
    platform: ["PC", "PS5", "Xbox Series X|S"],
    developer: "Sledgehammer Games",
    publisher: "Activision",
    stock: 30,
    rating: 4.0,
    releaseDate: "2023-11-10"
  },
  {
    title: "Spider-Man 2",
    description: "Spider-Men Peter Parker and Miles Morales face the ultimate test of strength inside and outside the mask.",
    price: 69.99,
    image: "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Action",
    platform: ["PS5"],
    developer: "Insomniac Games",
    publisher: "Sony Interactive Entertainment",
    stock: 20,
    rating: 4.7,
    releaseDate: "2023-10-20"
  },
  {
    title: "FIFA 24",
    description: "EA SPORTS FC 24 welcomes you to The World's Game – the most authentic football experience ever.",
    price: 59.99,
    image: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Sports",
    platform: ["PC", "PS5", "Xbox Series X|S", "PS4", "Xbox One"],
    developer: "EA Vancouver",
    publisher: "Electronic Arts",
    stock: 50,
    rating: 4.1,
    releaseDate: "2023-09-29"
  },
  {
    title: "Baldur's Gate 3",
    description: "Gather your party and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival.",
    price: 59.99,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "RPG",
    platform: ["PC", "PS5"],
    developer: "Larian Studios",
    publisher: "Larian Studios",
    stock: 12,
    rating: 4.9,
    releaseDate: "2023-08-03"
  },
  {
    title: "Alan Wake 2",
    description: "A psychological horror thriller that takes place 13 years after the events of the original Alan Wake.",
    price: 49.99,
    image: "https://images.pexels.com/photos/3945343/pexels-photo-3945343.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Horror",
    platform: ["PC", "PS5", "Xbox Series X|S"],
    developer: "Remedy Entertainment",
    publisher: "Epic Games Publishing",
    stock: 8,
    rating: 4.4,
    releaseDate: "2023-10-27"
  },
  {
    title: "Starfield",
    description: "Starfield is the first new universe in 25 years from Bethesda Game Studios, creators of The Elder Scrolls and Fallout series.",
    price: 69.99,
    image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "RPG",
    platform: ["PC", "Xbox Series X|S"],
    developer: "Bethesda Game Studios",
    publisher: "Bethesda Softworks",
    stock: 35,
    rating: 4.3,
    releaseDate: "2023-09-06"
  }
];

const createSampleProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pixel-mart');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Create sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Created ${products.length} sample products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error creating sample products:', error);
    process.exit(1);
  }
};

createSampleProducts();
