import { ShoppingCart, Star, Package } from 'lucide-react';
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
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={productName}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            <Package className="h-3 w-3 mr-1" />
            {stock > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        {stock <= 5 && stock > 0 && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              Low Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {productName}
          </h3>
        </div>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {renderStars(product.rating || 0)}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating || 0})</span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">
            {product.category}
          </span>
          <span className="text-xs text-gray-500">
            {Array.isArray(product.platform) ? product.platform.join(', ') : product.platform}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {stock <= 10 && stock > 0 && (
              <span className="text-xs text-orange-600">
                Only {stock} left!
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all ${
              stock > 0
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button
            onClick={() => onViewDetails?.(product)}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}