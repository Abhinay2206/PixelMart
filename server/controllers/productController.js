const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { 
      title, 
      name,
      description, 
      price, 
      category, 
      stock, 
      image,
      platform,
      developer,
      publisher,
      releaseDate,
      rating,
      genre,
      ageRating
    } = req.body;
    
    const productTitle = title || name;
    if (!productTitle) {
      return res.status(400).json({ message: 'Product title is required' });
    }

    if (!price || price < 0) {
      return res.status(400).json({ message: 'Valid price is required' });
    }

    const productData = {
      title: productTitle,
      name: productTitle, // For backwards compatibility
      description: description || '',
      price: parseFloat(price),
      category: category || 'Game',
      stock: parseInt(stock) || 0,
      image: image || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
      platform: Array.isArray(platform) ? platform : [platform || 'PC'],
      developer: developer || 'Independent',
      publisher: publisher || 'Independent',
      releaseDate: releaseDate || new Date().toISOString().split('T')[0],
      rating: parseFloat(rating) || 0,
      genre: genre || 'Other',
      ageRating: ageRating || 'RP'
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};