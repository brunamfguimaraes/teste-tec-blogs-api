const postService = require('../services/postServices');
const codes = require('../middlewares/codes');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;

  try {
    const post = await postService.createPost(title, content, userId);
    return res.status(codes.created).json(post);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const post = await postService.getAllPosts();
    return res.status(codes.ok).json(post);
  } catch (error) {
    const { code, message } = error;
    return res.status(code).json({ message });
  }
};

module.exports = { createPost, getAllPosts };