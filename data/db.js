const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedData = async () => {
    try {
        // Seed admin user
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const admin = new User({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedAdminPassword,
            role: 'admin'
        });
        await admin.save();
        console.log('Admin user created');

        // Seed regular user
        const hashedUserPassword = await bcrypt.hash('user123', 10);
        const user = new User({
            name: 'User',
            email: 'user@example.com',
            password: hashedUserPassword,
            role: 'user'
        });
        await user.save();
        console.log('Regular user created');
        const products = [
            {
                name: 'Wireless Headphones',
                price: 100,
                image: 'https://via.placeholder.com/300',
                category: 'Electronics'
            },
            {
                name: 'Smart Watch',
                price: 200,
                image: 'https://via.placeholder.com/300',
                category: 'Electronics'
            },
            {
                name: 'Bluetooth Speaker',
                price: 50,
                image: 'https://via.placeholder.com/300',
                category: 'Electronics'
            }
        ];

        await Product.insertMany(products);
        console.log('Products seeded');

        console.log('Seeding complete');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    seedData();
});