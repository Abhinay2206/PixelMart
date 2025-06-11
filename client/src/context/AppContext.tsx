import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, User, Order, ShippingAddress } from '../types';
import * as api from '../services/api';

interface ApiError {
  message: string;
  statusCode?: number;
}

interface AppState {
  products: Product[];
  cartItems: CartItem[];
  currentUser: User | null;
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_CART_ITEMS'; payload: CartItem[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  products: [],
  cartItems: [],
  currentUser: null,
  orders: [],
  isLoading: false,
  error: null,
};

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateCartItem: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  checkout: (shippingAddress: ShippingAddress, paymentMethod: string) => Promise<void>;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(item => 
        item.product._id === action.payload._id || item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            (item.product._id === action.payload._id || item.product.id === action.payload.id)
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { 
            id: action.payload._id || action.payload.id || '', 
            product: action.payload, 
            quantity: 1 
          }
        ],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CART_ITEMS':
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Load cart and orders when user changes
  useEffect(() => {
    if (state.currentUser) {
      loadCart();
      loadOrders();
    }
  }, [state.currentUser]);

  const loadProducts = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await api.getProducts();
      dispatch({ type: 'SET_PRODUCTS', payload: response.data });
    } catch {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load products' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadCart = async () => {
    try {
      const response = await api.getCart();
      dispatch({ type: 'SET_CART_ITEMS', payload: response.data.items || [] });
    } catch (err) {
      const error = err as ApiError;
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to load cart' });
    }
  };

  const loadOrders = async () => {
    try {
      const response = await api.getOrders();
      dispatch({ type: 'SET_ORDERS', payload: response.data.orders || [] });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load orders' });
    }
  };

  const contextValue: AppContextValue = {
    state,
    dispatch,
    login: async (email: string, password: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await api.login(email, password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SET_USER', payload: user });
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Login failed' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    register: async (name: string, email: string, password: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const response = await api.register(name, email, password);
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SET_USER', payload: user });
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Registration failed' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'SET_USER', payload: null });
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'SET_ORDERS', payload: [] });
    },
    addToCart: async (productId: string, quantity: number) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await api.addToCart(productId, quantity);
        await loadCart();
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to add item to cart' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    updateCartItem: async (productId: string, quantity: number) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await api.updateCart(productId, quantity);
        await loadCart();
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to update cart' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    removeFromCart: async (productId: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await api.removeFromCart(productId);
        await loadCart();
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to remove item from cart' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    checkout: async (shippingAddress: ShippingAddress, paymentMethod: string) => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        await api.checkout(shippingAddress, paymentMethod);
        await loadCart();
        await loadOrders();
      } catch (err) {
        const error = err as ApiError;
        dispatch({ type: 'SET_ERROR', payload: error.message || 'Checkout failed' });
        throw error;
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Helper hook for using the context
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}