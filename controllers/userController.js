const User = require('../models/User');

exports.createUser = async (req, res) => {
    try {
        const { name, phone, password, role } = req.body;
        
        // Only Admin can create other roles
        // Associates can create Supervisors and Centres
        // Supervisors can create Centres
        
        const existingUser = await User.findOne({ phone });
        if (existingUser) {
            return res.status(400).json({ message: 'Phone number already registered' });
        }

        const user = new User({
            name,
            phone,
            password,
            role,
            created_by: req.user.id
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user: { id: user._id, name: user.name, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
