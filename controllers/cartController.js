const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart) {
            return res.json([]);
        }
        const items = cart.items.map(item => ({
            id: item._id,
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
            quantity: item.quantity,
        }));
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }
        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }
        await cart.save();
        res.json({ message: 'Added to cart' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        const item = cart.items.id(req.params.id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        item.quantity = quantity;
        await cart.save();
        res.json({ message: 'Cart updated' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        cart.items = cart.items.filter(item => item._id.toString() !== req.params.id);
        await cart.save();
        res.json({ message: 'Item removed' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart };