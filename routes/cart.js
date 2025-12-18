const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/', authMiddleware, addToCart); // Users can add to their own cart
router.put('/:id', authMiddleware, adminMiddleware, updateCartItem); // Only admins can update quantities
router.delete('/:id', authMiddleware, adminMiddleware, removeFromCart); // Only admins can remove items

module.exports = router;