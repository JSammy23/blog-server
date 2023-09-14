var express = require('express');
var router = express.Router();
const passport = require('passport');
const mware = require('../config/middleware');

// Require controller modules
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.index);

// GET admins listing
router.get('/admins', userController.get_admins);

// POST Create User
router.post('/', userController.create_user);

// PUT Update User
router.put('/:id', passport.authenticate('jwt', {session: false}), mware.ensureAdminOrSelf, userController.update_user);

// DELETE user
router.delete('/:id', passport.authenticate('jwt', {session: false}), mware.ensureAdminOrSelf, userController.delete_user);

// POST User login
router.post('/login', userController.login);

module.exports = router;
