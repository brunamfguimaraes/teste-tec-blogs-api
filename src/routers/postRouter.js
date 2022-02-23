const express = require('express');
const postController = require('../controllers/postController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/post', jwtValidation, postController.getAllPosts);
router.get('/post/:id', jwtValidation, postController.getPostId);
router.post('/post', jwtValidation, postController.createPost);
//router.put('/post/:id', jwtValidation, postController.updatePost);

module.exports = router;