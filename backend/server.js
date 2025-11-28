require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Check for required environment variables
if (!process.env.JWT_SECRET) {
  console.error('❌ ERROR: JWT_SECRET is not set in .env file');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not set in .env file');
  process.exit(1);
}

console.log('✅ Environment variables loaded');

const app = express();

// CORS Configuration - UPDATED with correct Vercel URLs
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:5174',
    'https://electronics-shop-roan.vercel.app', // FIXED: Changed from electronics-hub
    'https://electronics-shop-git-main-shrutikas-projects-271002c5.vercel.app', // Vercel preview URLs
    'https://*.vercel.app' // Allow all Vercel domains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ElectroShop API is running',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 CORS enabled for Vercel domains`);
});
