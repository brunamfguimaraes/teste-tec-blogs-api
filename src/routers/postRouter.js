const express = require('express');
const postController = require('../controllers/postController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/post', jwtValidation, postController.getAllPosts);
router.get('/post/:id', jwtValidation, postController.getPostId);
router.put('/post/:id', jwtValidation, postController.updatePost);
router.post('/post', jwtValidation, postController.createPost);
router.delete('/post/:id', jwtValidation, postController.deletePost);

module.exports = router;