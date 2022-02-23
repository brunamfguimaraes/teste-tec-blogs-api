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

const getPostId = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postService.getPostId(id);
      res.status(codes.ok).json(post);
  } catch (error) {
      const { code, message } = error;
        return res.status(code).json({ message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const { title, content } = req.body;
  try {
    const update = await postService.updatePost(id, { title, content }, userId);
      return res.status(codes.ok).json(update);
  } catch (error) {
    const { code, message } = error;
      return res.status(code).json({ message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  try {
  const post = await postService.deletePost(id, userId);
    return res.status(codes.noContent).json(post);
  } catch (error) {
    const { code, message } = error;
      return res.status(code).json({ message });
  };
};

const getByQueryParam = async (req, res) => {
  const { q } = req.query;
  try {
  const posts = await postService.getByQueryParam(q);
    return res.status(codes.ok).json(posts);
} catch (error) {
  const { code, message } = error;
    return res.status(code).json({ message });
};
};

module.exports = {
  createPost,
  getAllPosts,
  getPostId,
  updatePost,
  deletePost,
  getByQueryParam,
};
