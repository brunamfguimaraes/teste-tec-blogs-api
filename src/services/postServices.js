const { Post, User } = require('../database/models');
const verifyPost = require('../middlewares/validations');
const removePostId = require('../middlewares/removePostId')

const createPost = async (title, content, userId) => {

  await verifyPost.verifyFieldsPost({ title, content });
  const post = await Post.create({ title, content, userId });
  const postWithoutId = removePostId(post);
    return postWithoutId;
};

const getAllPosts = async () => {
  const post = await Post.findAll(
    {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
  },
  );
  return post;
};

module.exports = { createPost, getAllPosts };