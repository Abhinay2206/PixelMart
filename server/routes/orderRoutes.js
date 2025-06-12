const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const orderController = require('../controllers/orderController');

// User routes
router.route('/checkout')
  .post(protect, orderController.createOrder);

router.route('/myorders')
  .get(protect, orderController.getOrders);

router.route('/:id')
  .get(protect, orderController.getOrderById);

// Admin routes - get all orders
router.route('/')
  .get(protect, isAdmin, orderController.getAllOrders);

// Admin routes - update order status
router.route('/:id/status')
  .put(protect, isAdmin, orderController.updateOrderStatus);

module.exports = router;