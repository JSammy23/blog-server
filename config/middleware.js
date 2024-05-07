const { param, validationResult } = require('express-validator');

exports.ensureAdminOrSelf = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        return next();
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    }
};

exports.ensureAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        return next();
    } else {
        return res.status(403).json({ message: 'Unauthorized' });
    };
};

// Validation middleware for post ID
exports.validatePostId = [
    param('id').isMongoId().withMessage('Invalid post ID format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];