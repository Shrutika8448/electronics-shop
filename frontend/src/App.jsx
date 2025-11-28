import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import ProductDetail from './components/products/ProductDetail';
import Cart from './components/cart/Cart';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-gradient-to-br from-offwhite-50 via-cream-50/20 to-offwhite-50">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
