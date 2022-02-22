const { Post, User } = require('../database/models');
const verifyPost = require('../middlewares/validations');
const removePostId = require('../middlewares/removePostId');
//const removePostUserId = require('../middlewares/removePostUserId');

const createPost = async (title, content, userId) => {

  await verifyPost.verifyFieldsPost({ title, content });
  const post = await Post.create({ title, content, userId });
  const postWithoutId = removePostId(post);
    return postWithoutId;
};


const removePostuserId = async () => {
  const getUserIds = await Post.findAll({
    include: [
      {
          model: Post,
          as: 'posts',
          attributes: { exclude: ['userId'] },
    }]});
    return getUserIds;
};
console.log(removePostuserId())

const getAllPosts = async () => {
  await removePostuserId();
  const post = await Post.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } } ],

  });
    console.log(post)
    return post;
/*   const postWithoutUserId = await removePostUserId(post);
  console.log(postWithoutUserId)
  return postWithoutUserId; */
};

module.exports = { createPost, getAllPosts };