const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Associate', 'Supervisor', 'Centre'], 
        required: true 
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'pending'], default: 'active' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
