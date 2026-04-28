const Delivery = require('../models/Delivery');
const Member = require('../models/Member');

exports.updateDelivery = async (req, res) => {
    try {
        const { memberId, photoProof } = req.body;
        
        const member = await Member.findById(memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        const delivery = new Delivery({
            member_id: memberId,
            photo_proof: photoProof, // Base64 string
            delivered_by: req.user.id,
            status: 'delivered'
        });

        await delivery.save();
        res.status(201).json({ message: 'Delivery updated successfully', delivery });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
