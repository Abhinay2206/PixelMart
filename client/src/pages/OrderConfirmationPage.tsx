import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShoppingBag, Check, Award, ShieldCheck, Truck, Mail } from 'lucide-react';
import { Order } from '../types/order';
import { orderService } from '../services/orderService';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get('orderId');
    
    if (!orderId) {
      setError('No order ID found');
      setLoading(false);
      return;
    }

    orderService.getOrderById(orderId)
      .then(order => {
        // Map _id to id and ensure all required fields exist
        const mappedOrder = {
          ...order,
          id: order._id || '',
          shippingAddress: {},
          paymentMethod:'card',
          updatedAt:new Date().toISOString(),
          items: order.items || [],
          total: order.total || 0,
          user: order.user || '',
          status: order.status || 'processing',
          createdAt: order.createdAt || new Date().toISOString(),
        } as Order;
        setOrder(mappedOrder);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center relative">
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-gaming-neon/20 to-gaming-primary/20 rounded-full opacity-70 animate-pulse-slow"></div>
          <div className="relative z-10">
            <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-gaming-neon border-r-transparent mb-4"></div>
            <h2 className="text-xl font-bold text-white gaming-text-shadow">Preparing Your Legendary Items...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="relative max-w-md w-full bg-dark-800/70 backdrop-blur-sm p-8 rounded-2xl border-2 border-gaming-primary/40 shadow-2xl gaming-card-border">
          <div className="absolute inset-0 bg-gradient-to-br from-gaming-primary/10 to-transparent rounded-2xl"></div>
          <div className="relative z-10 text-center">
            <div className="p-3 bg-dark-900/80 inline-flex rounded-full border-2 border-gaming-primary/50 mb-4">
              <ShieldCheck className="h-10 w-10 text-gaming-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Quest Failed</h2>
            <p className="text-gray-300 mb-6">{error || 'Could not retrieve order details'}</p>
            <Link 
              to="/products"
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gaming-primary/30"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>Return to Arsenal</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gaming-neon/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-gaming-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-gaming-secondary to-gaming-neon rounded-full flex items-center justify-center mx-auto mb-6 animate-glow border-2 border-white/10 shadow-xl">
            <Check className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-4 gaming-text-shadow">
            <span className="bg-gradient-to-r from-gaming-neon to-gaming-gold bg-clip-text text-transparent">
              LEGENDARY PURCHASE CONFIRMED!
            </span>
          </h1>
          <p className="text-gray-200 text-lg max-w-xl mx-auto">Your epic adventure awaits. We've secured your digital artifacts and they're ready for battle.</p>
        </div>

        <div className="bg-dark-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-gaming-neon/30 shadow-xl gaming-card-border">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gaming-neon/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-lg">
                <Award className="h-5 w-5 text-dark-900" />
              </div>
              <h2 className="text-xl font-bold text-white">Order Details</h2>
            </div>
            <span className="text-sm py-1 px-3 bg-dark-900/80 rounded-lg border border-gaming-neon/30 text-gaming-neon">
              Order #{order._id}
            </span>
          </div>

          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.product.id || item.product._id} className="flex items-center space-x-4 bg-dark-900/40 p-4 rounded-xl border border-gaming-neon/20 hover:border-gaming-neon/40 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-gaming-neon/20">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-gaming-neon/30 to-gaming-primary/30 rounded-lg blur-sm"></div>
                  <img
                    src={item.product.image}
                    alt={item.product.name || item.product.title || 'Product'}
                    className="w-20 h-20 rounded-lg object-cover relative z-10 border border-white/10"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{item.product.name || item.product.title}</h3>
                  <p className="text-sm text-gray-300">Quantity: <span className="text-gaming-neon">{item.quantity}</span></p>
                </div>
                <div className="text-gaming-gold font-bold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gaming-neon/20 mt-8 pt-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Subtotal</span>
              <span className="text-white">{formatPrice(order.total * 0.9)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Tax</span>
              <span className="text-white">{formatPrice(order.total * 0.1)}</span>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-gaming-neon/20">
              <span className="text-xl font-bold text-white">Total</span>
              <span className="text-xl font-black bg-gradient-to-r from-gaming-gold to-gaming-primary bg-clip-text text-transparent">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-800/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border-2 border-gaming-accent/30 shadow-xl gaming-card-border">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gaming-accent/20">
            <div className="p-2 bg-gradient-to-r from-gaming-accent to-gaming-secondary rounded-lg">
              <Truck className="h-5 w-5 text-dark-900" />
            </div>
            <h2 className="text-xl font-bold text-white">Shipping Information</h2>
          </div>
          
          <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-accent/20">
            <p className="font-bold text-gaming-accent mb-2">{order.shippingAddress.fullName}</p>
            <p className="text-gray-200">{order.shippingAddress.address}</p>
            <p className="text-gray-200">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p className="text-gray-200">{order.shippingAddress.country}</p>
            <div className="flex items-center mt-4 pt-4 border-t border-gaming-accent/20 text-gray-200">
              <Mail className="h-4 w-4 text-gaming-accent mr-2" />
              <p>{order.shippingAddress.email}</p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <Link 
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gaming-neon to-gaming-accent hover:from-gaming-accent hover:to-gaming-neon text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-gaming-neon/50 border border-white/10"
          >
            <ShoppingBag className="h-6 w-6 mr-2" />
            Continue Adventure
          </Link>
        </div>
        
        {/* Game-themed footer elements */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-dark-900/60 p-4 rounded-xl border border-gaming-neon/20 flex flex-col items-center text-center">
            <div className="p-2 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-full mb-2">
              <ShieldCheck className="h-5 w-5 text-dark-900" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Secured Purchase</h3>
            <p className="text-xs text-gray-400">Transaction protected with encryption</p>
          </div>
          
          <div className="bg-dark-900/60 p-4 rounded-xl border border-gaming-primary/20 flex flex-col items-center text-center">
            <div className="p-2 bg-gradient-to-r from-gaming-primary to-gaming-accent rounded-full mb-2">
              <Truck className="h-5 w-5 text-dark-900" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Fast Delivery</h3>
            <p className="text-xs text-gray-400">Digital items available immediately</p>
          </div>
          
          <div className="bg-dark-900/60 p-4 rounded-xl border border-gaming-gold/20 flex flex-col items-center text-center">
            <div className="p-2 bg-gradient-to-r from-gaming-gold to-gaming-accent rounded-full mb-2">
              <Award className="h-5 w-5 text-dark-900" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Premium Support</h3>
            <p className="text-xs text-gray-400">Legendary gaming assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
