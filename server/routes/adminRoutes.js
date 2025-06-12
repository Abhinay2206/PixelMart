const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const  isAdmin  = require('../middleware/isAdmin');
const {
  getAllUsers,
  deleteUser,
  getAnalytics,
  updateOrderStatus,
  getDashboardStats
} = require('../controllers/adminController');

// All admin routes require authentication and admin privileges
router.use(protect);
router.use(isAdmin);

// User management
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);

// Analytics
router.get('/analytics', getAnalytics);
router.get('/dashboard', getDashboardStats);

// Order management
router.put('/orders/:orderId/status', updateOrderStatus);

module.exports = router;
