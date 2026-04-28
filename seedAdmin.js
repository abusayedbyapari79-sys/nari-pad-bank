const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nari-pad-bank');
        
        const adminExists = await User.findOne({ role: 'Admin' });
        if (adminExists) {
            console.log('Admin already exists');
            process.exit();
        }

        const admin = new User({
            name: 'Main Admin',
            phone: '1234567890',
            password: 'adminpassword', // Will be hashed by pre-save hook
            role: 'Admin',
            status: 'active'
        });

        await admin.save();
        console.log('Admin created successfully');
        console.log('Phone: 1234567890');
        console.log('Password: adminpassword');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

createAdmin();
