const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: { type: String },
    bookmarkCount: { type: Number, default: 0 },
    tabCount: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

const User = mongoose.model('user', UserSchema);

module.exports = User;
