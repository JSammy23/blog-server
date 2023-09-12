const User = require('../models/user');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

/********** Routes needed **********/
// Grab all users
// Grab admins
// Create User
// Update User
// Delete User



// Grab all Users
exports.index = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).exec();
    res.json(users);
});

// Grab all admins/authors
exports.get_admins = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: GET all admins');
});

// Create new user
exports.create_user = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: POST Create User');
});

// Update user
exports.update_user = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: PUT Update User');
});