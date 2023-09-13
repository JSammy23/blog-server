const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

exports.create_comment = [
    body('content', 'Content is required')
        .trim()
        .notEmpty()
        .isLength({min: 1, max: 500}).withMessage('Content must be between 1 and 500 characters.')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const comment = new Comment({
            user: req.body.user,
            content: req.body.content
        });

        await comment.save();

        // Add the comment to the post's comments array
        post.comments.push(comment);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully!', comment: comment });
    })
];

exports.delete_comment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        return res.status(404).json({ message: 'Comment not found.' });
    }

    // Find the associated post
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ message: 'Associated post not found.' });
    }

    // Remove the comment's ID from the post's comments array
    const index = post.comments.indexOf(req.params.commentId);
    if (index > -1) {
        post.comments.splice(index, 1);
    }

    await post.save();
    
    // Now, delete the comment
    await Comment.findByIdAndDelete(req.params.commentId);

    res.status(200).json({ message: 'Comment deleted successfully!' });
});