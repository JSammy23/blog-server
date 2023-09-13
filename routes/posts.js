var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');

// GET all posts
router.get('/', postController.index);

// GET specific post
router.get('/:id', postController.get_post);

// POST create post
router.post('/', postController.create_post);

// PUT update post
router.put('/:id', postController.update_post);

// DELETE post
router.delete('/:id', postController.delete_post);

module.exports = router;