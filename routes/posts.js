var express = require('express');
var router = express.Router();

const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentController');

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

///// Comment Routes /////

// POST create comment
router.post('/:id/comments', commentsController.create_comment);

// DELETE comment
router.delete('/:id/comment/:commentId', commentsController.delete_comment);

module.exports = router;