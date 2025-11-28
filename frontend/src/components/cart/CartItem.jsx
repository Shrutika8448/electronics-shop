import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="card p-5 md:p-6 flex flex-col sm:flex-row gap-5 hover:border-primary-300/70">
      <div className="bg-gradient-to-br from-offwhite-100 to-offwhite-50 rounded-xl overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full sm:w-32 h-40 sm:h-32 object-cover"
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-offwhite-900 mb-2">{item.name}</h3>
          <p className="text-offwhite-600 text-sm">₹{item.price.toLocaleString()} each</p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="w-9 h-9 flex items-center justify-center bg-offwhite-200 hover:bg-offwhite-300 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <Minus className="w-4 h-4 text-offwhite-700" />
            </button>
            <span className="font-semibold text-lg w-10 text-center text-offwhite-900">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="w-9 h-9 flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end sm:space-x-6">
            <p className="text-xl font-bold text-primary-700">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-warm-600 hover:text-warm-700 hover:bg-warm-50 transition-all duration-200 p-2 rounded-xl"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
