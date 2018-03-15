const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    files: [{type: Schema.Types.ObjectId, ref: 'User'}],
    profilImg: String,
    facebookId: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);