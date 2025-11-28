import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="card overflow-hidden h-full flex flex-col group hover:border-primary-300/70">
      <div 
        className="overflow-hidden cursor-pointer bg-gradient-to-br from-offwhite-100 to-offwhite-50"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-offwhite-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-primary-700 transition-colors">
          {product.name}
        </h3>
        
        <span className="inline-block px-3 py-1.5 bg-primary-100/80 text-primary-700 text-xs font-semibold rounded-full mb-4 w-fit border border-primary-200/50">
          {product.category}
        </span>
        
        <p className="text-2xl font-bold text-primary-700 mb-5">
          ₹{product.price.toLocaleString()}
        </p>
        
        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="btn-primary w-full mt-auto flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
