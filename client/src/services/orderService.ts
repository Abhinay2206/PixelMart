/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';
import { Order, ShippingAddress } from '../types';

export interface CreateOrderData {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'paypal';
  total: number;
  // Add payment details if paying by card
  paymentDetails?: {
    cardNumber?: string;
    cardName?: string;
    expiryDate?: string;
    cvv?: string;
  };
}

export const orderService = {
  createOrder: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      // Sanitize the order data before sending
      const sanitizedOrderData = {
        items: orderData.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: {
          fullName: orderData.shippingAddress.fullName,
          email: orderData.shippingAddress.email,
          address: orderData.shippingAddress.address,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          zipCode: orderData.shippingAddress.zipCode,
          country: orderData.shippingAddress.country,
        },
        paymentMethod: orderData.paymentMethod,
        total: Number(orderData.total.toFixed(2)), // Ensure total is a number with 2 decimal places
        ...(orderData.paymentMethod === 'card' && {
          paymentDetails: orderData.paymentDetails
        })
      };

      const response = await api.post('/orders/checkout', sanitizedOrderData);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Failed to create order');
      }
      throw new Error('Network error occurred while creating order');
    }
  },

  getOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/myorders');
    return response.data.orders;
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Add these functions to orderService
  getAllOrders: async () => {
    const response = await api.get('/api/orders/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await api.put(`/api/orders/admin/orders/${orderId}`, { status });
    return response.data;
  }
};
