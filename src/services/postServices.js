const { Op } = require('sequelize');
const { Post, User } = require('../database/models');
const codes = require('../middlewares/codes');
const errorMessages = require('../middlewares/errorMessages');
const Indexerror = require('../middlewares/Indexerror');
const verifyPost = require('../middlewares/validations');
const removePostId = require('../middlewares/removePostId');
const informationDisplayed = require('../middlewares/informationDisplayed');

const createPost = async (title, content, userId) => {
  await verifyPost.verifyFieldsPost({ title, content });
  const post = await Post.create({ title, content, userId });
  const postWithoutId = removePostId(post);
    return postWithoutId;
};

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

const getId = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) {
    throw new Indexerror(codes.notFound, errorMessages.postDoesntExist);
  };
    return post;
};

const updatePost = async (id, { title, content }, idUser) => {
  await verifyPost.verifyFieldsPost({ title, content });

  const requestPostById = await getId(id);
  if (requestPostById.userId !== idUser) {
    throw new Indexerror(codes.unauthorized, errorMessages.userUnauthorized);
  }
  await Post.update({ title, content }, { where: { id: id } });
  const postUpdate = await getId(id);
  const infoToShow = informationDisplayed(postUpdate);
    return infoToShow;
};

const deletePost = async (id, idUser) => {
  const { userId } = await getPostId(id);

  if (userId !== idUser) {
    throw new Indexerror(codes.unauthorized, errorMessages.userUnauthorized);
  };
  const removeUser = await Post.destroy({ where: { id: id } });
  return removeUser;
};

/* Para criar o requisito abaixo:
https://stackabuse.com/using-sequelize-orm-with-nodejs-and-express/
https://sequelize.org/v4/manual/tutorial/querying.html
https://stackoverflow.com/questions/53971268/node-sequelize-find-where-like-wildcard
*/

const getByQueryParam = async (query) => {
  if (!query) return getAllPosts();

  return Post.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user' },
    ],
  });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostId,
  updatePost,
  deletePost,
  getByQueryParam,
};
