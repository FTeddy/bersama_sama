const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    filePath: String,
    mimeType: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);