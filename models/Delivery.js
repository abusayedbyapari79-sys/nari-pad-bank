const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    date: { type: Date, default: Date.now },
    photo_proof: { type: String }, // Base64 or URL
    delivered_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'delivered'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
