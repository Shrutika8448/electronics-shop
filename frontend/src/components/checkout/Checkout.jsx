import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle } from 'lucide-react';
import API_URL from '../../config/api';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        customerName: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: getCartTotal()
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to place an order');
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const data = await response.json();
      setOrderId(data._id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert(error.message || 'Failed to place order. Please try again.');
    }
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="text-center py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-offwhite-900 mb-4">Your cart is empty</h2>
        <p className="text-offwhite-600 mb-8">Add items to your cart to proceed with checkout</p>
        <button
          onClick={() => navigate('/products')}
          className="btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 md:py-24">
        <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-warm-100 to-warm-50 flex items-center justify-center">
          <CheckCircle className="w-20 h-20 text-warm-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-warm-700 mb-4">Order Placed Successfully!</h1>
        <div className="card p-6 mb-6 bg-warm-50/50 border-warm-200">
          <p className="text-lg text-offwhite-800">
            Order ID: <span className="font-bold text-warm-700">{orderId}</span>
          </p>
        </div>
        <p className="text-offwhite-700 mb-8 text-lg">
          Thank you for your purchase. We'll send a confirmation email shortly.
        </p>
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
      <h1 className="text-3xl md:text-4xl font-bold text-offwhite-900 mb-8 bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="card p-6 md:p-8">
            <h2 className="text-xl font-semibold text-offwhite-900 mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-offwhite-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-offwhite-800 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-offwhite-800 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder="+91 1234567890"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-offwhite-800 mb-2">
                  Shipping Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="input-field resize-none"
                  placeholder="Enter your complete address"
                />
              </div>
              
              <button type="submit" className="btn-primary w-full py-3 text-lg">
                Place Order
              </button>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 md:p-8 sticky top-24 border-primary-200/50">
            <h2 className="text-xl font-semibold text-offwhite-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cartItems.map(item => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm pb-4 border-b border-offwhite-300"
                >
                  <span className="text-offwhite-700">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="font-semibold text-offwhite-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 border-t border-offwhite-300 pt-4">
              <div className="flex justify-between text-offwhite-700">
                <span>Subtotal:</span>
                <span className="font-semibold text-offwhite-900">₹{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-offwhite-700">
                <span>Shipping:</span>
                <span className="font-semibold text-warm-600">Free</span>
              </div>
              <div className="border-t border-offwhite-300 pt-4">
                <div className="flex justify-between text-xl font-bold text-offwhite-900">
                  <span>Total:</span>
                  <span className="text-primary-700">₹{getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
