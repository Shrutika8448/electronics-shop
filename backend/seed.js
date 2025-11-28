require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'Latest Apple flagship with titanium design',
    price: 134900,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1592286927505-38a2e8b86db3?w=500',
    stock: 15,
    specifications: {
      brand: 'Apple',
      model: 'iPhone 15 Pro',
      features: ['A17 Pro chip', '48MP camera', 'Titanium design']
    }
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android flagship with S Pen',
    price: 124900,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    stock: 12,
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      features: ['Snapdragon 8 Gen 3', '200MP camera', 'S Pen included']
    }
  },
  {
    name: 'OnePlus 12',
    description: 'Flagship killer with fast charging',
    price: 64900,
    category: 'Smartphones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    stock: 20,
    specifications: {
      brand: 'OnePlus',
      model: 'OnePlus 12',
      features: ['Snapdragon 8 Gen 3', '100W fast charging', '120Hz display']
    }
  },
  {
    name: 'MacBook Air M2',
    description: 'Powerful and lightweight laptop',
    price: 114900,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    stock: 10,
    specifications: {
      brand: 'Apple',
      model: 'MacBook Air M2',
      features: ['M2 chip', '13.6" display', '18hr battery']
    }
  },
  {
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop for professionals',
    price: 149900,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    stock: 8,
    specifications: {
      brand: 'Dell',
      model: 'XPS 15',
      features: ['Intel i7', '15.6" OLED', 'RTX 4050']
    }
  },
  {
    name: 'HP Spectre x360',
    description: '2-in-1 convertible laptop',
    price: 129900,
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500',
    stock: 7,
    specifications: {
      brand: 'HP',
      model: 'Spectre x360',
      features: ['Intel i7', '13.5" touch', '360° hinge']
    }
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'Professional tablet with M2 chip',
    price: 109900,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    stock: 8,
    specifications: {
      brand: 'Apple',
      model: 'iPad Pro',
      features: ['M2 chip', '12.9" Liquid Retina', 'ProMotion']
    }
  },
  {
    name: 'Samsung Galaxy Tab S9',
    description: 'Premium Android tablet',
    price: 89900,
    category: 'Tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    stock: 10,
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy Tab S9',
      features: ['Snapdragon 8 Gen 2', '12.4" AMOLED', 'S Pen included']
    }
  },
  {
    name: 'AirPods Pro',
    description: 'Active noise cancellation earbuds',
    price: 24900,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
    stock: 25,
    specifications: {
      brand: 'Apple',
      model: 'AirPods Pro (2nd gen)',
      features: ['ANC', 'Spatial audio', 'Transparency mode']
    }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Premium noise-cancelling headphones',
    price: 34900,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 15,
    specifications: {
      brand: 'Sony',
      model: 'WH-1000XM5',
      features: ['Industry-leading ANC', '30hr battery', 'Hi-Res Audio']
    }
  },
  {
    name: 'JBL Flip 6',
    description: 'Portable Bluetooth speaker',
    price: 8999,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    stock: 30,
    specifications: {
      brand: 'JBL',
      model: 'Flip 6',
      features: ['Waterproof', '12hr battery', 'PartyBoost']
    }
  },
  {
    name: 'Apple Watch Series 9',
    description: 'Latest smartwatch with health features',
    price: 44900,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 18,
    specifications: {
      brand: 'Apple',
      model: 'Watch Series 9',
      features: ['S9 chip', 'Always-on display', 'ECG app']
    }
  },
  {
    name: 'Samsung Galaxy Watch 6',
    description: 'Premium Android smartwatch',
    price: 29900,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 20,
    specifications: {
      brand: 'Samsung',
      model: 'Galaxy Watch 6',
      features: ['Wear OS', '40hr battery', 'Health monitoring']
    }
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Premium wireless mouse',
    price: 8999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    stock: 25,
    specifications: {
      brand: 'Logitech',
      model: 'MX Master 3S',
      features: ['Ergonomic design', '70-day battery', 'Multi-device']
    }
  },
  {
    name: 'Keychron K8 Pro',
    description: 'Mechanical keyboard for professionals',
    price: 12999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    stock: 15,
    specifications: {
      brand: 'Keychron',
      model: 'K8 Pro',
      features: ['Mechanical switches', 'Wireless', 'RGB backlight']
    }
  }
];

mongoose.connect(process.env.MONGO_URI) // Use env variable
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('✅ Sample products added!');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err);
    process.exit(1);
  });

