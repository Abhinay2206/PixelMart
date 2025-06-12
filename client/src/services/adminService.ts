import api,{ handleApiError } from './api';
import { Product, Order, User } from '../types';

export interface AnalyticsData {
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  totalProducts: number;
  recentOrders: Order[];
  topProducts: (Product & { totalSold: number; revenue: number })[];
  salesByMonth: { month: string; sales: number; orderCount: number }[];
}

export interface DashboardStats {
  today: { orders: number; revenue: number };
  weekly: { orders: number; revenue: number };
  monthly: { orders: number; revenue: number };
  lowStockProducts: Product[];
}

class AdminService {
  // Product Management
  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product> {
    try {
      const response = await api.put(`/products/${productId}`, updates);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await api.delete(`/products/${productId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Order Management
  async getAllOrders(): Promise<Order[]> {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // User Management
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get('/admin/users');
      return response.data.users;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await api.delete(`/admin/users/${userId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const response = await api.get('/admin/analytics');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Bulk operations
  async bulkUpdateProducts(updates: { productId: string; updates: Partial<Product> }[]): Promise<Product[]> {
    try {
      const promises = updates.map(({ productId, updates: productUpdates }) => 
        this.updateProduct(productId, productUpdates)
      );
      return await Promise.all(promises);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async bulkDeleteProducts(productIds: string[]): Promise<void> {
    try {
      const promises = productIds.map(id => this.deleteProduct(id));
      await Promise.all(promises);
    } catch (error) {
      throw handleApiError(error);
    }
  }

  // Inventory management
  async getInventoryAlerts(): Promise<Product[]> {
    try {
      const response = await api.get('/products');
      const products: Product[] = response.data;
      return products.filter(product => 
        typeof product.stock === 'number' && product.stock <= 10
      );
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async updateStock(productId: string, quantity: number): Promise<Product> {
    try {
      const response = await api.put(`/products/${productId}`, { stock: quantity });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const adminService = new AdminService();
export default adminService;
