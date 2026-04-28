const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    collected_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
