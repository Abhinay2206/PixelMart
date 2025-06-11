import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product, CartItem, Order, User, ShippingAddress } from '../types';

const API_BASE_URL = 'http://localhost:5010/api';

interface LoginResponse {
  token: string;
  user: User;
}

interface CartResponse {
  items: CartItem[];
}

interface OrdersResponse {
  orders: Order[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

let isRefreshing = false;
let failedQueue: { resolve: (token: string) => void; reject: (error: unknown) => void; }[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// Add interceptor to add auth token to requests
api.interceptors.request.use((config: import('axios').InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post('/auth/refresh');
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        processQueue(null, token);
        
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Auth endpoints
export const login = (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => 
  api.post('/auth/login', { email, password });

export const register = (name: string, email: string, password: string): Promise<AxiosResponse<LoginResponse>> => 
  api.post('/auth/register', { name, email, password });

// Product endpoints
export const getProducts = (): Promise<AxiosResponse<Product[]>> => 
  api.get('/products');

export const getProduct = (id: string): Promise<AxiosResponse<Product>> => 
  api.get(`/products/${id}`);

// Cart endpoints
export const getCart = (): Promise<AxiosResponse<CartResponse>> => 
  api.get('/cart');

export const addToCart = (productId: string, quantity: number): Promise<AxiosResponse<CartResponse>> => 
  api.post('/cart/add', { productId, quantity });

export const updateCart = (productId: string, quantity: number): Promise<AxiosResponse<CartResponse>> => 
  api.put('/cart/update', { productId, quantity });

export const removeFromCart = (productId: string): Promise<AxiosResponse<CartResponse>> => 
  api.delete(`/cart/remove/${productId}`);

// Order endpoints
export const checkout = (shippingAddress: ShippingAddress, paymentMethod: string): Promise<AxiosResponse<Order>> => 
  api.post('/orders/checkout', { shippingAddress, paymentMethod });

export const getOrders = (): Promise<AxiosResponse<OrdersResponse>> => 
  api.get('/orders/myorders');

// Admin endpoints
export const updateProduct = (productId: string, updates: Partial<Product>): Promise<AxiosResponse<Product>> => 
  api.put(`/products/${productId}`, updates);

export const deleteProduct = (productId: string): Promise<AxiosResponse<void>> => 
  api.delete(`/products/${productId}`);

export const getAllOrders = (): Promise<AxiosResponse<{ orders: Order[] }>> => 
  api.get('/orders');

// Error handling
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string }>;
    return {
      message: axiosError.response?.data?.message || axiosError.message,
      statusCode: axiosError.response?.status
    };
  }
  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
};

export default api;
