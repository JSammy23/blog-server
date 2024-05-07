const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, maxLength: 30, required: true },
    lastName: { type: String, maxLength: 30, required: true },
    username: { type: String, maxLength: 30, minLength: 2, required: true, unique: true },
    password: { type: String, maxLength: 100, minLength: 8, required: true },
    role: { type: String, enum: ['admin', 'reader'], default: 'reader' }, 
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: [/\S+@\S+\.\S+/, 'is invalid'], maxLength: 100, minLength: 5 },
    profilePicture: { type: String },
    bio: { type: String },
    joinedDate: { type: Date, default: Date.now }
});

UserSchema.virtual('url').get(function () {
    return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UserSchema);