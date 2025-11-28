import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCart, Menu, X, Zap, Home, Store, LogIn, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-offwhite-50/95 backdrop-blur-md text-offwhite-900 sticky top-0 z-50 shadow-sm border-b border-offwhite-200/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl md:text-2xl font-bold hover:text-primary-700 transition group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="hidden sm:inline bg-gradient-to-r from-primary-700 to-primary-600 bg-clip-text text-transparent">Electronics Hub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-primary-700 transition font-medium text-offwhite-800 hover:scale-105 transform duration-200">
              Home
            </Link>
            <Link to="/products" className="hover:text-primary-700 transition font-medium text-offwhite-800 hover:scale-105 transform duration-200">
              Products
            </Link>
            <button
              onClick={() => navigate('/cart')}
              className="relative hover:text-primary-700 transition p-2 rounded-xl hover:bg-offwhite-100"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-warm-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-offwhite-300">
                <div className="flex items-center space-x-2 text-offwhite-700">
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-offwhite-700 hover:text-primary-700 transition font-medium p-2 rounded-xl hover:bg-offwhite-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center space-x-2 btn-primary px-4 py-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-offwhite-200 rounded-xl transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-offwhite-100/95 backdrop-blur-md border-t border-offwhite-200/50">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 p-3 hover:bg-offwhite-200 rounded-xl transition"
            >
              <Home className="w-5 h-5 text-primary-700" />
              <span className="text-offwhite-800 font-medium">Home</span>
            </Link>
            <Link
              to="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-3 p-3 hover:bg-offwhite-200 rounded-xl transition"
            >
              <Store className="w-5 h-5 text-primary-700" />
              <span className="text-offwhite-800 font-medium">Products</span>
            </Link>
            <button
              onClick={() => {
                navigate('/cart');
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-3 p-3 hover:bg-offwhite-200 rounded-xl transition w-full text-left"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-primary-700" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-warm-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="text-offwhite-800 font-medium">Cart</span>
            </button>
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 p-3">
                  <User className="w-5 h-5 text-primary-700" />
                  <span className="text-offwhite-800 font-medium">{user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-3 p-3 hover:bg-offwhite-200 rounded-xl transition w-full text-left"
                >
                  <LogOut className="w-5 h-5 text-primary-700" />
                  <span className="text-offwhite-800 font-medium">Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 p-3 hover:bg-offwhite-200 rounded-xl transition w-full text-left"
              >
                <LogIn className="w-5 h-5 text-primary-700" />
                <span className="text-offwhite-800 font-medium">Login</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
