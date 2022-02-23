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
    //const { title, content, published, updated} = req.body;
    //const { id } = req.user;

    const post = await postService.getAllPosts();
    //await postService.removeUserId(id, title, content, published, updated )
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

/* const updatePost = async (req, res) => {
  const { id } = req.params;
  console.log(id, "controller")
  const { title, content } = req.body;
  console.log(title, content, "controller")
  const { id: userId } = req.user;
  console.log(userId, "controller")
  try {
  const post = await postService.updatePost({ id, title, content, userId });
  console.log(post, "controller 51")
    res.status(codes.ok).json(post);
} catch (error) {
  const { code, message } = error;
    return res.status(code).json({ message });
}
};
 */
module.exports = { createPost, getAllPosts, getPostId };