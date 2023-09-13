var express = require('express');
var router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.index);

// GET admins listing
router.get('/admins', userController.get_admins);

// POST Create User
router.post('/', userController.create_user);

// PUT Update User
router.put('/:id', userController.update_user);

// DELETE user
router.delete('/:id', userController.delete_user);

module.exports = router;
