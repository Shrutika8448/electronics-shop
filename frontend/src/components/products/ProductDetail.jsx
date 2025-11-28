import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ShoppingCart, ArrowLeft, Loader2, Package, CheckCircle, XCircle } from 'lucide-react';
import API_URL from '../../config/api';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`); // CHANGED LINE
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-700" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-offwhite-600">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-primary-700 hover:text-primary-800 mb-6 font-medium hover:scale-105 transition-transform duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="card overflow-hidden p-4 bg-gradient-to-br from-offwhite-100 to-offwhite-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl"
          />
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-offwhite-900 mb-4 bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">
              {product.name}
            </h1>
            <span className="inline-block px-4 py-2 bg-primary-100/80 text-primary-700 text-sm font-semibold rounded-full border border-primary-200/50">
              {product.category}
            </span>
          </div>
          
          <p className="text-4xl md:text-5xl font-bold text-primary-700">
            ₹{product.price.toLocaleString()}
          </p>
          
          <p className="text-offwhite-700 leading-relaxed text-lg">
            {product.description}
          </p>
          
          {/* Specifications */}
          {product.specifications && (
            <div className="card p-6 space-y-3 bg-offwhite-50/50">
              <h3 className="text-lg font-semibold text-offwhite-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-offwhite-800 w-24">Brand:</span>
                  <span className="text-offwhite-700">{product.specifications.brand}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-offwhite-800 w-24">Model:</span>
                  <span className="text-offwhite-700">{product.specifications.model}</span>
                </div>
                {product.specifications.features && (
                  <div>
                    <span className="font-semibold text-offwhite-800">Features:</span>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-offwhite-700">
                      {product.specifications.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            {product.stock > 0 ? (
              <>
                <div className="w-6 h-6 rounded-full bg-warm-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-warm-600" />
                </div>
                <span className="text-warm-700 font-semibold">
                  In Stock ({product.stock} available)
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-warm-600" />
                <span className="text-warm-600 font-semibold">Out of Stock</span>
              </>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <button
            onClick={() => {
              addToCart(product);
              navigate('/cart');
            }}
            disabled={product.stock === 0}
            className="btn-primary w-full py-4 text-lg flex items-center justify-center space-x-3"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Add to Cart & View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
