import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Checkout from '../components/checkout/Checkout';
import ProtectedRoute from '../components/common/ProtectedRoute';

const CheckoutPage = () => {
  return (
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  );
};

export default CheckoutPage;
