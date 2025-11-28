const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createOrder } = require('../controllers/orderController');

// Create order (requires authentication)
router.post('/', protect, createOrder);

// Get order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

