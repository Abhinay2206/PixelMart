const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get all users (admin only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Delete user (admin only)
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Prevent admin from deleting themselves
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

// Get analytics data (admin only)
const getAnalytics = async (req, res) => {
  try {
    // Get total counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ status: 'completed' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

    // Get recent orders (last 10)
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(10);

    // Get top products by order frequency
    const topProductsAggregation = await Order.aggregate([
      { $unwind: '$items' },
      { 
        $group: { 
          _id: '$items.product', 
          totalSold: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        } 
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    const topProductIds = topProductsAggregation.map(item => item._id);
    const topProducts = await Product.find({ _id: { $in: topProductIds } });
    
    const topProductsWithStats = topProducts.map(product => {
      const stats = topProductsAggregation.find(item => item._id.toString() === product._id.toString());
      return {
        ...product.toJSON(),
        totalSold: stats?.totalSold || 0,
        revenue: stats?.revenue || 0
      };
    });

    // Get sales by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const salesByMonth = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sixMonthsAgo },
          status: 'completed'
        } 
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          sales: { $sum: '$total' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const formattedSalesByMonth = salesByMonth.map(item => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      sales: item.sales,
      orderCount: item.orderCount
    }));

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders,
      topProducts: topProductsWithStats,
      salesByMonth: formattedSalesByMonth
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    const updatedOrder = await Order.findById(orderId).populate('user', 'name email');
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Today's stats
    const todayOrders = await Order.countDocuments({ createdAt: { $gte: startOfDay } });
    const todayRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfDay }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // Weekly stats
    const weeklyOrders = await Order.countDocuments({ createdAt: { $gte: startOfWeek } });
    const weeklyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // Monthly stats
    const monthlyOrders = await Order.countDocuments({ createdAt: { $gte: startOfMonth } });
    const monthlyRevenue = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth }, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    // Low stock products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).sort({ stock: 1 });

    res.status(200).json({
      today: {
        orders: todayOrders,
        revenue: todayRevenue[0]?.total || 0
      },
      weekly: {
        orders: weeklyOrders,
        revenue: weeklyRevenue[0]?.total || 0
      },
      monthly: {
        orders: monthlyOrders,
        revenue: monthlyRevenue[0]?.total || 0
      },
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard stats', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
  getAnalytics,
  updateOrderStatus,
  getDashboardStats
};
