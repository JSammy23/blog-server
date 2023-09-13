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
    res.send('Not Implemented: GET all posts.')
});

exports.get_post = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: GET post: ${req.params.id}.`)
});

exports.create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: POST Create post.')
});

exports.update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: PUT Update post.')
});