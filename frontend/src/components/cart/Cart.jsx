import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CartItem from './CartItem';
import { ShoppingCart, ArrowRight, Trash2, LogIn } from 'lucide-react';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 md:py-24">
        <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-offwhite-200 to-offwhite-100 flex items-center justify-center">
          <ShoppingCart className="w-16 h-16 text-offwhite-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-offwhite-900 mb-4">Your cart is empty</h2>
        <p className="text-offwhite-600 mb-8">Start adding items to your cart!</p>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-offwhite-900 mb-8 bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 md:p-8 sticky top-24 border-primary-200/50">
            <h2 className="text-xl font-semibold text-offwhite-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-offwhite-700">
                <span>Subtotal:</span>
                <span className="font-semibold text-offwhite-900">₹{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-offwhite-700">
                <span>Shipping:</span>
                <span className="font-semibold text-warm-600">Free</span>
              </div>
              <div className="border-t border-offwhite-300 pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold text-offwhite-900">
                  <span>Total:</span>
                  <span className="text-primary-700">₹{getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {!isAuthenticated && (
              <div className="mb-4 p-4 bg-warm-50 border border-warm-200 rounded-xl">
                <div className="flex items-center space-x-2 text-warm-700 mb-2">
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">Login Required</span>
                </div>
                <p className="text-sm text-warm-600">
                  You need to login to proceed to checkout
                </p>
              </div>
            )}
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login', { state: { from: '/checkout' } });
                } else {
                  navigate('/checkout');
                }
              }}
              className="btn-primary w-full py-3 flex items-center justify-center space-x-2 mb-3"
            >
              <span>{isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}</span>
              {isAuthenticated ? <ArrowRight className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
            </button>
            
            <button
              onClick={clearCart}
              className="w-full py-3 border-2 border-warm-500 text-warm-600 hover:bg-warm-50 font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:border-warm-600"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
