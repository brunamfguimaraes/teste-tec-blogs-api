const express = require('express');
const postController = require('../controllers/postController');
const { jwtValidation } = require('../middlewares/jwtValidation');

const router = express.Router();

router.get('/post', jwtValidation, postController.getAllPosts);
router.post('/post', jwtValidation, postController.createPost);

module.exports = router;