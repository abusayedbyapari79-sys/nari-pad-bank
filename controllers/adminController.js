const Member = require('../models/Member');
const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalMembers = await Member.countDocuments();
        const activeMembers = await Member.countDocuments({ status: 'active' });
        
        // Fee is 170 per member
        const totalRevenue = activeMembers * 170;

        res.json({
            totalMembers,
            activeMembers,
            totalRevenue
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.fraudCheck = async (req, res) => {
    try {
        const duplicates = await Member.aggregate([
            { $group: { _id: "$phone", count: { $sum: 1 }, members: { $push: "$$ROOT" } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        res.json({ duplicates });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
