import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Loader2, Search, X } from 'lucide-react';
import API_URL from '../../config/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQuery, sortOption]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      if (sortOption) params.append('sort', sortOption);
      
      // USE API_URL instead of hardcoded localhost
      const url = `${API_URL}/api/products?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      setProducts([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const categories = ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Audio'];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Search and Sort Bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="input-field w-full md:w-64"
        >
          <option value="">Sort by: Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>

      {/* Category Filters */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-3 min-w-max sm:min-w-0">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-sm ${
              !selectedCategory
                ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-primary-300'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 whitespace-nowrap shadow-sm ${
                selectedCategory === cat
                  ? 'bg-primary-700 text-white hover:bg-primary-800 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-primary-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <p className="text-gray-600 mb-6">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      )}
      
      {/* Product Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-4">
            {searchQuery || selectedCategory 
              ? 'No products found' 
              : 'Unable to connect to server'}
          </p>
          <p className="text-gray-500">
            {searchQuery || selectedCategory 
              ? 'Try adjusting your search or filters' 
              : 'Please make sure the backend server is running'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
