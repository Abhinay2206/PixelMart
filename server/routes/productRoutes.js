const express = require('express');
const router = express.Router();
const {protect, isAdmin} = require('../middleware/authMiddleware');
const { 
  getProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Public routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Admin routes
router.post('/products', protect, isAdmin, createProduct);
router.put('/products/:id', protect, isAdmin, updateProduct);
router.delete('/products/:id', protect, isAdmin, deleteProduct);

module.exports = router;