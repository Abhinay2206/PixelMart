import { useState } from 'react';
import { Filter, X, Star, Tag, Monitor, DollarSign } from 'lucide-react';
import { FilterOptions } from '../types';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
  platforms: string[];
}

export default function ProductFilters({ 
  filters, 
  onFiltersChange, 
  categories, 
  platforms 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: '',
      platform: '',
      priceRange: [0, 100],
      minRating: 0,
      inStock: false,
    });
  };

  const hasActiveFilters = 
    filters.category || 
    filters.platform || 
    filters.priceRange[0] > 0 || 
    filters.priceRange[1] < 100 || 
    filters.minRating > 0 || 
    filters.inStock;

  return (
    <div className="bg-dark-800/60 backdrop-blur-sm rounded-xl shadow-xl p-6 mb-6 border-2 border-gaming-neon/30 gaming-card-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-gaming-neon to-gaming-accent rounded-lg border border-white/10">
            <Filter className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white">Advanced Filters</h3>
        </div>
        <div className="flex items-center space-x-4">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center text-sm text-gaming-primary hover:text-gaming-accent transition-colors px-3 py-1 rounded-lg border border-gaming-primary/30 hover:border-gaming-accent/50 bg-dark-900/50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gaming-neon hover:text-gaming-accent transition-colors"
          >
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-5 gap-5 ${isOpen ? 'block' : 'hidden md:grid'}`}>
        {/* Category Filter */}
        <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-neon/20">
          <label className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
            <Tag className="h-4 w-4 text-gaming-neon" />
            <span>Game Category</span>
          </label>
          <select
            value={filters.category}
            onChange={(e) => updateFilter('category', e.target.value)}
            className="w-full p-3 bg-dark-800/80 border border-gaming-neon/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gaming-neon focus:border-transparent transition-all duration-300"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Platform Filter */}
        <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-accent/20">
          <label className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
            <Monitor className="h-4 w-4 text-gaming-accent" />
            <span>Gaming Platform</span>
          </label>
          <select
            value={filters.platform}
            onChange={(e) => updateFilter('platform', e.target.value)}
            className="w-full p-3 bg-dark-800/80 border border-gaming-accent/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gaming-accent focus:border-transparent transition-all duration-300"
          >
            <option value="">All Platforms</option>
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-primary/20">
          <label className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
            <DollarSign className="h-4 w-4 text-gaming-primary" />
            <span>Price Range</span>
          </label>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-gaming-primary"
            />
            <div className="flex justify-between text-xs">
              <span className="text-gaming-primary px-2 py-1 rounded-lg border border-gaming-primary/30 bg-dark-900/70">
                ${filters.priceRange[0]}
              </span>
              <span className="text-gaming-primary px-2 py-1 rounded-lg border border-gaming-primary/30 bg-dark-900/70">
                ${filters.priceRange[1]}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-gold/20">
          <label className="flex items-center space-x-2 text-sm font-medium text-white mb-3">
            <Star className="h-4 w-4 text-gaming-gold fill-current" />
            <span>Min Rating</span>
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
            className="w-full p-3 bg-dark-800/80 border border-gaming-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gaming-gold focus:border-transparent transition-all duration-300"
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>

        {/* Stock Filter */}
        <div className="bg-dark-900/50 p-4 rounded-xl border border-gaming-secondary/20 flex flex-col justify-center">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${filters.inStock ? 'bg-gaming-secondary' : 'bg-dark-700'} flex`}>
              <div className={`w-4 h-4 rounded-full transition-transform duration-300 transform ${filters.inStock ? 'bg-white translate-x-6' : 'bg-gray-400 translate-x-0'}`}></div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">In Stock Only</span>
              <span className="text-xs text-gray-400">Show available games</span>
            </div>
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => updateFilter('inStock', e.target.checked)}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
