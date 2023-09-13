const Post = require('../models/post');
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

/********* Post Routes *********/
// Get all posts
// Get specefic post
// Create post
// Update post
// Delete post

exports.index = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({}).exec();
    res.json(posts);
});

exports.get_post = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id).exec();
    res.json(post);
});

exports.create_post = [
    body('title', 'Title is required.')
        .trim()
        .isLength({ min: 5, max: 150 }).withMessage('Title must be between 5 and 150 characters.')
        .escape(),
        body('content', 'Content cannot be empty.')
        .trim()
        .isLength({ min: 10 }).withMessage('Content should be at least 10 characters.'),
    body('published')
        .optional() 
        .isBoolean().withMessage('Published status must be true or false.')
        .toBoolean(),
    body('allowComments')
        .optional()
        .isBoolean().withMessage('Comment status must be true or false.')
        .toBoolean(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            ...req.body.published !== undefined && { published: req.body.published },
            ...req.body.allowComments !== undefined && { allowComments: req.body.allowComments }
        });

        const newPost = await post.save();
        res.status(201).json({ message: 'Posy created successfully!', post: newPost });
    })
]

exports.update_post = [
    // Validate and sanitize fields.
    body('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 150 }).withMessage('Title must be between 5 and 150 characters.')
        .escape(),
    body('content')
        .optional()
        .trim()
        .isLength({ min: 10 }).withMessage('Content should be at least 10 characters.'),
    body('published')
        .optional()
        .isBoolean().withMessage('Published status must be true or false.')
        .toBoolean(),
    body('allowComments')
        .optional()
        .isBoolean().withMessage('Comment status must be true or false.')
        .toBoolean(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Construct update object based on existence of fields.
        const updateData = {};
        if (req.body.title !== undefined) updateData.title = req.body.title;
        if (req.body.content !== undefined) updateData.content = req.body.content;
        if (req.body.published !== undefined) updateData.published = req.body.published;
        if (req.body.allowComments !== undefined) updateData.allowComments = req.body.allowComments;

        // Use findByIdAndUpdate to update the post.
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true }); // "new: true" returns the modified document rather than the original.

        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json({ message: 'Post updated successfully!', post: updatedPost });
    })
];