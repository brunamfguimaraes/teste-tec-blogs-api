const Sequelize = require('sequelize');
const { Post, User } = require('../database/models');
const codes = require('../middlewares/codes');
const errorMessages = require('../middlewares/errorMessages');
const Indexerror = require('../middlewares/Indexerror');
const verifyPost = require('../middlewares/validations');
const removePostId = require('../middlewares/removePostId');

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config')[env];
const sequelize = new Sequelize(config);
//const removePostUserId = require('../middlewares/removePostUserId');

const createPost = async (title, content, userId) => {

  await verifyPost.verifyFieldsPost({ title, content });
  const post = await Post.create({ title, content, userId });
  const postWithoutId = removePostId(post);
    return postWithoutId;
};


/* const removeUserId = async (id, title, content, published, updated) => {
   await Post.findAll({ title, content, published, updated });
  const postWithoutId = removePostUserId({ id, title, content, published, updated });
  return postWithoutId;
}; */
//console.log(removeUserId())

const getAllPosts = async () => {
  const post = await Post.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } } ],
  });
    return post;
};

const getPostId = async (id) => {
  const post = await Post.findOne({ where: { id },
    include:
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  if (!post) {
    throw new Indexerror(codes.notFound, errorMessages.postDoesntExist);
  };
    return post;
};

//console.log(getPostId())

/* const getPostId = async (id) => {
console.log(id, "services 31")
  const post = await Post.findOne({
    where: { id },
      //include:
      //{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    });
  console.log(post, "services 35")
  if (!post) {
    throw new Indexerror(codes.notFound, errorMessages.postDoesntExist);
  }
}; */


/* const updateBlogPost = async ({ title, content, id, userId }) =>

  sequelize.transaction(async (t) => {
    const [affectedRows] = await Post.update(
      { title, content, updated: Date.now() }, { where: { id, userId }, transaction: t },
    );

    if (affectedRows === 0)  throw new Indexerror(codes.badRequest, errorMessages.invalidToken);

    const postFound = await Post.findByPk(id);
    console.log(postFound)
    return postFound.toJSON();
  }); */


/* const updatePost = async ({ id, title, content, userId }) => {
  console.log(id, title)
  await verifyPost.verifyFieldsPost({ title, content });
  const newPost = await updateBlogPost({ title, content, id, userId });
  console.log(newPost, "services 61")
  return newPost;
}; */


module.exports = { createPost, getAllPosts, getPostId };
