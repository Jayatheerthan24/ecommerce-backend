const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const createDb=require('./data/db')
createDb();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));
app.use('/cart', require('./routes/cart'));
app.use('/orders', require('./routes/orders'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});