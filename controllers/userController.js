const User = require('../models/user');

const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');

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
    const admins = await User.find({ role: 'admin' }).exec();
    res.json(admins);
});

// Create new user
exports.create_user = [
    body('firstName', 'First name is required.')
        .trim()
        .notEmpty()
        .isLength({max: 30})
        .escape(),
    body('lastName', 'Last name is required.')
        .trim()
        .notEmpty()
        .isLength({max: 30})
        .escape(),
    body('username', 'Username is required.')
        .trim()
        .isAlphanumeric()
        .isLength({min: 2, max: 30})
        .escape(),
    body('password', 'Password is required.')
        .trim()
        .isLength({min: 8, max: 100})
        .custom((value, {req}) => {
            if (value != req.body.confirm_password) {
                throw new Error('Passwords must match.');
            }
            return true;
        }),
    body('confirm_password', 'Confirm password')
        .trim()
        .isLength({min: 8, max: 100}),
    body('email', 'Email is required.')
        .trim()
        .notEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });

        const savedUser = await user.save();
        res.status(201).json({ message: 'User created successfully!', user: savedUser });
    })
];

// Update user
exports.update_user = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: PUT Update User ${req.params.id}`);
});

// Delete user
exports.delete_user = asyncHandler(async (req, res, next) => {
    res.send(`Not Implemented: Delete User ${req.params.id}`);
});