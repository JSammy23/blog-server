const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    timestamp: { type: Date, default: Date.now },
    allowComments: { type: Boolean, default: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

PostSchema.virtual('url').get(function () {
    return `/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);