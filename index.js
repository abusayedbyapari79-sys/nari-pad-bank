const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Higher limit for base64 photos
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
