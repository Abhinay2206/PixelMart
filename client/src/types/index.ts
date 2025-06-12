export interface Product {
  productId: string | undefined;
  id?: string;          // Client-side id
  _id: string;          // MongoDB id
  title?: string;       // Mock data
  name?: string;        // API data
  description: string;
  price: number;
  image: string;
  category: string;
  platform: string | string[]; // Can be either string or array
  releaseDate?: string;
  stock?: number;        // Mock data
  countInStock?: number; // API data
  rating?: number;
  developer?: string;
  publisher?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  _id?: string;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt?: string;
}

export interface Order {
  _id: string;
  user?: {
    email: string;
  };
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'shipped' | 'delivered';
  createdAt?: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface FilterOptions {
  category: string;
  platform: string;
  priceRange: [number, number];
  minRating: number;
  inStock: boolean;
}