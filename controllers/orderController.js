const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }
        const items = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const order = new Order({ userId: req.user.id, items, total });
        await order.save();
        // Clear cart
        cart.items = [];
        await cart.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { createOrder, getOrders };