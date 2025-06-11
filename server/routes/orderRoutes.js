const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

// User routes
router.route('/')
  .post(protect, orderController.createOrder);

router.route('/myorders')
  .get(protect, orderController.getOrders);

router.route('/:id')
  .get(protect, orderController.getOrderById);

// Admin routes
router.route('/admin/orders')
  .get(protect, isAdmin, orderController.getAllOrders);

router.route('/admin/orders/:id')
  .put(protect, isAdmin, orderController.updateOrderStatus);

module.exports = router;