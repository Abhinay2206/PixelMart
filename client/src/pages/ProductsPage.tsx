import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import { FilterOptions, Product } from '../types';
import { Search, Grid, List, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';
import * as api from '../services/api';

export default function ProductsPage() {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    platform: '',
    priceRange: [0, 100],
    minRating: 0,
    inStock: false,
  });

  const itemsPerPage = 12;

  // Load products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getProducts();
        dispatch({ type: 'SET_PRODUCTS', payload: response.data });
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [dispatch]);

  // Get unique categories and platforms
  const categories = useMemo(() => {
    return Array.from(new Set(state.products.map(p => p.category)));
  }, [state.products]);
  
  const platforms = useMemo(() => {
    const allPlatforms = state.products.flatMap(p => p.platform || []);
    return Array.from(new Set(allPlatforms));
  }, [state.products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = state.products.filter(product => {
      if (!product) return false;

      // Search filter
      const searchField = product.name || product.title || '';
      if (searchTerm && !searchField.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Platform filter
      const platforms = Array.isArray(product.platform) ? product.platform : [];
      if (filters.platform && !platforms.includes(filters.platform)) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      const rating = product.rating || 0;
      if (rating < filters.minRating) {
        return false;
      }

      // Stock filter
      const stock = product.stock || product.countInStock || 0;
      if (filters.inStock && stock === 0) {
        return false;
      }

      return true;
    });

    // Sort products
    return [...filtered].sort((a, b) => {
      if (!a || !b) return 0;
      
      switch (sortBy) {
        case 'price-low': {
          return (a.price || 0) - (b.price || 0);
        }
        case 'price-high': {
          return (b.price || 0) - (a.price || 0);
        }
        case 'rating': {
          return ((b.rating || 0) - (a.rating || 0));
        }
        case 'newest': {
          const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
          const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
          return dateB - dateA;
        }
        case 'name':
        default: {
          const aName = a.name || a.title || '';
          const bName = b.name || b.title || '';
          return aName.localeCompare(bName);
        }
      }
    });
  }, [state.products, searchTerm, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (product: Product) => {
    // TODO: Navigate to product details page
    console.log('View details for:', product.title);
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gaming-neon/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-gaming-primary/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-xl flex items-center justify-center border border-gaming-neon/50 neon-glow">
                <Gamepad2 className="h-7 w-7 text-white" />
              </div>
              <h1 className="text-4xl font-black text-white gaming-text-shadow">
                <span className="bg-gradient-to-r from-gaming-neon to-gaming-primary bg-clip-text text-transparent">
                  GAME ARSENAL
                </span>
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-lg group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gaming-neon group-focus-within:text-gaming-primary transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search for legendary games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-dark-900/80 border-2 border-gaming-neon/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gaming-neon focus:border-transparent transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gaming-neon/15 via-transparent to-gaming-primary/15 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-dark-900/80 border-2 border-gaming-neon/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gaming-neon focus:border-transparent transition-all duration-300"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>

                <div className="flex border-2 border-gaming-neon/30 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all ${viewMode === 'grid' ? 'bg-gaming-neon text-dark-900' : 'text-gaming-neon hover:bg-gaming-neon/20'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all ${viewMode === 'list' ? 'bg-gaming-neon text-dark-900' : 'text-gaming-neon hover:bg-gaming-neon/20'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <ProductFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
            platforms={platforms}
          />

          {/* Results Info */}
          <div className="mb-6 bg-dark-800/50 px-4 py-3 rounded-xl border border-gaming-neon/20 backdrop-blur-sm shadow-lg">
            <p className="text-gray-300">
              Showing <span className="text-gaming-neon font-bold">{paginatedProducts.length}</span> of <span className="text-gaming-neon font-bold">{filteredProducts.length}</span> legendary titles
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-12 bg-dark-800/50 rounded-xl border border-gaming-primary/50 backdrop-blur-sm">
              <p className="text-gaming-primary text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-3 bg-gradient-to-r from-gaming-primary to-gaming-accent text-white rounded-xl hover:shadow-xl hover:shadow-gaming-primary/30 transition-all duration-300 transform hover:scale-105"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-gaming-neon border-r-transparent"></div>
              <p className="mt-4 text-gaming-neon">Loading your game arsenal...</p>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                    : 'space-y-6'
                } mb-8`}>
                  {paginatedProducts.map((product) => (              
                    <ProductCard
                      key={product._id || product.id}
                      product={product}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-dark-800/50 rounded-xl border border-gaming-neon/30 backdrop-blur-sm">
                  <p className="text-gray-300 text-lg">No legendary titles found matching your quest parameters.</p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 my-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-3 bg-dark-800 border-2 border-gaming-neon/30 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gaming-neon/20 text-white transition-all duration-300 flex items-center"
                  >
                    <ChevronLeft className="h-5 w-5 mr-1" />
                    Previous
                  </button>
                  
                  <div className="hidden sm:flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-gaming-neon to-gaming-accent text-dark-900 border-2 border-white/20 shadow-lg shadow-gaming-neon/30'
                            : 'border-2 border-gaming-neon/30 hover:bg-gaming-neon/20 text-white'
                        } transition-all duration-300`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <div className="sm:hidden flex items-center space-x-2">
                    <span className="text-gray-300">
                      Page <span className="text-gaming-neon font-bold">{currentPage}</span> of <span className="text-gaming-neon font-bold">{totalPages}</span>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-3 bg-dark-800 border-2 border-gaming-neon/30 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gaming-neon/20 text-white transition-all duration-300 flex items-center"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}