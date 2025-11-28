const API_URL = import.meta.env.PROD 
  ? 'https://electronics-shop-7f1x.onrender.com' // e.g., https://your-backend.onrender.com
  : 'http://localhost:5000';

export default API_URL;
