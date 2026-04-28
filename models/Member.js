const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    member_id: { type: String, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    centre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fee: { type: Number, default: 170 },
    status: { type: String, enum: ['pending', 'active'], default: 'pending' },
    join_date: { type: Date, default: Date.now }
}, { timestamps: true });

memberSchema.pre('save', async function(next) {
    if (!this.member_id) {
        const randomDigits = Math.floor(10000 + Math.random() * 90000);
        this.member_id = `NPB${randomDigits}`;
    }
    next();
});

module.exports = mongoose.model('Member', memberSchema);
