import { ShoppingCart, Star, Package, Eye, Heart, Zap, Trophy } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { dispatch } = useApp();
  const stock = product.stock ?? product.countInStock ?? 0;
  const productName = product.name || product.title || '';

  const handleAddToCart = () => {
    if (stock > 0) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-colors ${
          i < Math.floor(rating) ? 'text-gaming-gold fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="group relative bg-gradient-to-br from-dark-900 to-dark-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-gaming-neon/40 transition-all duration-500 transform hover:scale-[1.02] hover:rotate-1 border border-gaming-neon/30">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-neon/15 via-transparent to-gaming-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/50 to-transparent z-10"></div>
        <img
          src={product.image}
          alt={productName}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button className="p-2 bg-dark-900/90 backdrop-blur-sm rounded-full text-gaming-neon hover:bg-gaming-neon hover:text-dark-900 transition-all duration-300 transform hover:scale-110 border border-gaming-neon/30">
            <Heart className="h-4 w-4" />
          </button>
          <button 
            onClick={() => onViewDetails?.(product)}
            className="p-2 bg-dark-900/90 backdrop-blur-sm rounded-full text-gaming-secondary hover:bg-gaming-secondary hover:text-dark-900 transition-all duration-300 transform hover:scale-110 border border-gaming-secondary/30"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        {/* Status Badges */}
        <div className="absolute top-4 left-4 z-20">
          {stock > 0 ? (
            <div className="flex flex-col space-y-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg border border-white/10">
                <Package className="h-3 w-3 mr-1" />
                In Stock
              </span>
              {stock <= 5 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gaming-primary to-red-500 text-white shadow-lg animate-pulse border border-white/10">
                  <Zap className="h-3 w-3 mr-1" />
                  Only {stock} left!
                </span>
              )}
            </div>
          ) : (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-600 to-gray-500 text-white shadow-lg border border-white/10">
              <Package className="h-3 w-3 mr-1" />
              Out of Stock
            </span>
          )}
        </div>

        {/* Rating Badge */}
        {product.rating && product.rating >= 4.5 && (
          <div className="absolute bottom-4 left-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gaming-gold to-yellow-400 text-dark-900 shadow-lg">
              <Trophy className="h-3 w-3 mr-1" />
              Top Rated
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 relative z-10 bg-dark-900/80 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-gaming-neon transition-colors duration-300 gaming-text-shadow">
            {productName}
          </h3>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {renderStars(product.rating || 0)}
          </div>
          <span className="ml-2 text-sm text-gray-300 font-medium">({product.rating || 0})</span>
        </div>

        <p className="text-gray-200 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="flex items-center space-x-2 mb-4">
          <span className="inline-block bg-gradient-to-r from-gaming-accent to-gaming-secondary text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-white/10">
            {product.category}
          </span>
          <span className="text-xs text-gaming-neon font-medium bg-dark-900/50 px-2 py-1 rounded-lg border border-gaming-neon/20">
            {Array.isArray(product.platform) ? product.platform.join(', ') : product.platform}
          </span>
        </div>

        <div className="flex items-center justify-between mb-6 bg-dark-900/50 p-2 rounded-lg border border-gaming-gold/20">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white bg-gradient-to-r from-gaming-gold to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 flex items-center justify-center px-4 py-3 rounded-xl font-bold transition-all duration-300 transform ${
              stock > 0
                ? 'bg-gradient-to-r from-gaming-primary to-gaming-accent text-white hover:shadow-lg hover:shadow-gaming-primary/40 hover:scale-105 active:scale-95 border border-white/10'
                : 'bg-gray-700 text-gray-300 cursor-not-allowed border border-gray-600/30'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>

        {/* Gaming-style corner decorations */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          <div className="w-full h-full bg-gradient-to-br from-gaming-neon to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          <div className="w-full h-full bg-gradient-to-tr from-gaming-primary to-transparent"></div>
        </div>
      </div>
    </div>
  );
}
