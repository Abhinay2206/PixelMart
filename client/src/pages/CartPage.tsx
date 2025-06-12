import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Gamepad2, Trophy, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartPage() {
  const { state, dispatch } = useApp();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const subtotal = state.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (state.cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 flex items-center justify-center">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-r from-gaming-neon/20 to-gaming-primary/20 rounded-3xl flex items-center justify-center mx-auto animate-pulse">
              <ShoppingBag className="h-16 w-16 text-gaming-neon" />
            </div>
            <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-gaming-primary/10 to-gaming-accent/10 rounded-3xl animate-ping mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white">
              <span className="bg-gradient-to-r from-gaming-neon to-gaming-primary bg-clip-text text-transparent">
                Your Arsenal is Empty
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md mx-auto">
              Time to gear up! Browse our legendary collection and add some epic games to your cart.
            </p>
          </div>
          
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gaming-primary/30"
          >
            <Gamepad2 className="h-5 w-5 mr-3" />
            Start Your Quest
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center space-x-4 mb-12">
          <div className="w-12 h-12 bg-gradient-to-r from-gaming-neon to-gaming-primary rounded-xl flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white">
            <span className="bg-gradient-to-r from-gaming-neon to-gaming-primary bg-clip-text text-transparent">
              Gaming Cart
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-dark-700 to-dark-600 rounded-2xl overflow-hidden border border-gaming-neon/20 shadow-2xl">
              <div className="px-8 py-6 border-b border-gaming-neon/20 bg-gradient-to-r from-gaming-neon/10 to-gaming-primary/10">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Trophy className="h-6 w-6 text-gaming-gold mr-3" />
                  Your Gaming Arsenal ({state.cartItems.length})
                </h2>
              </div>
              
              <div className="divide-y divide-gaming-neon/10">
                {state.cartItems.map((item) => (
                  <div key={item.id} className="p-8 flex items-center space-x-6 hover:bg-gaming-neon/5 transition-colors group">
                    {/* Product Image */}
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-20 h-20 rounded-xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gaming-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <h3 className="text-xl font-bold text-white truncate group-hover:text-gaming-neon transition-colors">
                        {item.product.title}
                      </h3>
                      <div className="flex items-center space-x-3">
                        <span className="inline-block bg-gradient-to-r from-gaming-accent to-gaming-secondary text-white text-xs px-3 py-1 rounded-full font-bold">
                          {item.product.category}
                        </span>
                        <span className="text-gaming-neon text-sm font-medium">
                          {Array.isArray(item.product.platform) 
                            ? item.product.platform.join(', ')
                            : item.product.platform}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-black text-gaming-gold">
                      {formatPrice(item.product.price)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 bg-dark-800 hover:bg-gaming-primary rounded-lg text-gaming-neon hover:text-white transition-all duration-300 transform hover:scale-110 border border-gaming-neon/20"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center font-bold text-white text-lg bg-dark-800 py-2 rounded-lg border border-gaming-neon/20">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= (item.product.stock || 0)}
                        className="p-2 bg-dark-800 hover:bg-gaming-accent rounded-lg text-gaming-neon hover:text-white transition-all duration-300 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed border border-gaming-neon/20"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-xl font-black text-gaming-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-3 bg-gaming-primary/20 hover:bg-gaming-primary rounded-lg text-gaming-primary hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-gradient-to-br from-dark-700 to-dark-600 rounded-2xl p-8 border border-gaming-neon/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Zap className="h-6 w-6 text-gaming-accent mr-3" />
                Battle Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gaming-neon/10">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold text-white text-lg">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gaming-neon/10">
                  <span className="text-gray-400">Tax</span>
                  <span className="font-bold text-white text-lg">{formatPrice(tax)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gaming-neon/10">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-bold text-white text-lg">
                    {shipping === 0 ? (
                      <span className="text-gaming-neon font-black">FREE! 🚀</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                
                {subtotal < 50 && (
                  <div className="text-sm text-gaming-accent bg-gaming-accent/10 p-3 rounded-xl border border-gaming-accent/20 backdrop-blur-sm">
                    <span className="font-bold">⚡ Power Up:</span> Add {formatPrice(50 - subtotal)} more for free shipping!
                  </div>
                )}
                
                <div className="border-t border-gaming-neon/20 pt-4 bg-gradient-to-r from-gaming-primary/10 to-gaming-accent/10 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-white">Epic Total</span>
                    <span className="text-2xl font-black bg-gradient-to-r from-gaming-neon to-gaming-gold bg-clip-text text-transparent">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to="/checkout"
                  className="w-full bg-gradient-to-r from-gaming-primary to-gaming-accent hover:from-gaming-accent hover:to-gaming-primary text-white font-black py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-gaming-primary/30 text-center block flex items-center justify-center group"
                >
                  <Zap className="h-5 w-5 mr-3 group-hover:animate-pulse" />
                  Launch Checkout Sequence
                </Link>
                <Link
                  to="/products"
                  className="w-full border-2 border-gaming-neon/30 bg-dark-800/50 hover:bg-gaming-neon/10 text-gaming-neon hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 text-center block flex items-center justify-center group backdrop-blur-sm"
                >
                  <Gamepad2 className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                  Continue the Hunt
                </Link>
              </div>

              {/* Security badges */}
              <div className="mt-8 pt-6 border-t border-gaming-neon/20">
                <div className="flex items-center justify-center space-x-6 text-sm text-gaming-neon/80">
                  <span className="flex items-center space-x-2">
                    <span className="text-gaming-gold">🔒</span>
                    <span className="font-medium">Quantum Secured</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="text-gaming-accent">✓</span>
                    <span className="font-medium">Victory Guaranteed</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}