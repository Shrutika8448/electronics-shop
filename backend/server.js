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

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'https://electronics-hub-gamma.vercel.app', 'https://electronics-hub-roan.vercel.app','https://*.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
