const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid phone or password' });
        }

        if (user.status !== 'active') {
            return res.status(403).json({ message: 'User account is not active' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_super_secret_key',
            { expiresIn: '1d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
