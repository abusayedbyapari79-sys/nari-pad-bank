const Member = require('../models/Member');
const User = require('../models/User');

exports.registerMember = async (req, res) => {
    try {
        const { name, phone, centre_id } = req.body;
        
        const existingMember = await Member.findOne({ phone });
        if (existingMember) {
            return res.status(400).json({ message: 'Member with this phone already exists' });
        }

        const member = new Member({
            name,
            phone,
            centre_id: centre_id || req.user.id // If a centre registers, it's their ID
        });

        await member.save();
        res.status(201).json({ message: 'Member registered successfully', member });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMembers = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'Centre') {
            query = { centre_id: req.user.id };
        }
        
        const members = await Member.find(query).populate('centre_id', 'name');
        res.json(members);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.approveMember = async (req, res) => {
    try {
        const { memberId } = req.body;
        const member = await Member.findById(memberId);
        
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        member.status = 'active';
        await member.save();
        
        res.json({ message: 'Member approved successfully', member });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
