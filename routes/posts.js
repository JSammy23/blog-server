var express = require('express');
var router = express.Router();
const passport = require('passport');
const mware = require('../config/middleware');

const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentController');

// GET all published posts
router.get('/', postController.index);

// GET all posts
router.get('/all', passport.authenticate('jwt', {session: false}), mware.ensureAdmin, postController.getAllPosts);

// GET specific post
router.get('/:id', postController.get_post);

// POST create post
router.post('/', passport.authenticate('jwt', {session: false}), mware.ensureAdmin, postController.create_post);

// PUT update post
router.put('/:id', passport.authenticate('jwt', {session: false}), mware.ensureAdmin, postController.update_post);

// DELETE post
router.delete('/:id', passport.authenticate('jwt', {session: false}), mware.ensureAdmin, postController.delete_post);

///// Comment Routes /////

// POST create comment
router.post('/:id/comments', passport.authenticate('jwt', {session: false}), commentsController.create_comment);

// DELETE comment
router.delete('/:id/comment/:commentId', passport.authenticate('jwt', {session: false}), commentsController.delete_comment);

module.exports = router;