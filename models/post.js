const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    author: {
        name: { type: String, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    summary: { type: String, required: true },
    tags: [{ type: String }],
    publishedDate: { type: Date, default: Date.now },
    lastModified: { type: Date, default: Date.now },
    allowComments: { type: Boolean, default: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    featuredImage: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

PostSchema.virtual('url').get(function () {
    return `/posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);