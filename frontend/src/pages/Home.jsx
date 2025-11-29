import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Truck, Shield, ArrowRight } from 'lucide-react';
import Slideshow from '../components/common/Slideshow';
import ProductCard from '../components/products/ProductCard';
import { Loader2 } from 'lucide-react';
import API_URL from '../../config/api';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      // Get first 4 products
      setFeaturedProducts(data.slice(0, 4));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
      // Set empty array on error so UI doesn't break
      setFeaturedProducts([]);
    }
  };

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Slideshow */}
      <Slideshow />
      
      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="card p-8 md:p-10 text-center group hover:border-primary-300/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Smartphone className="w-10 h-10 text-primary-700" />
          </div>
          <h3 className="text-xl font-semibold text-offwhite-900 mb-3">Latest Devices</h3>
          <p className="text-offwhite-600 leading-relaxed">
            Newest smartphones, tablets, and laptops
          </p>
        </div>
        
        <div className="card p-8 md:p-10 text-center group hover:border-primary-300/50">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-warm-100 to-warm-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Truck className="w-10 h-10 text-warm-700" />
          </div>
          <h3 className="text-xl font-semibold text-offwhite-900 mb-3">Free Shipping</h3>
          <p className="text-offwhite-600 leading-relaxed">
            Free delivery on all orders
          </p>
        </div>
        
        <div className="card p-8 md:p-10 text-center group hover:border-primary-300/50 sm:col-span-2 lg:col-span-1">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cream-200 to-cream-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-10 h-10 text-cream-800" />
          </div>
          <h3 className="text-xl font-semibold text-offwhite-900 mb-3">Secure Shopping</h3>
          <p className="text-offwhite-600 leading-relaxed">
            Safe and secure transactions
          </p>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-offwhite-900 bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-outline flex items-center space-x-2 group"
          >
            <span>Explore More</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
            </div>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-offwhite-600 mb-4">Unable to load products</p>
            <p className="text-offwhite-500">Please make sure the backend server is running on port 5000</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
