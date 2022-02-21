const removePostId = ({ title, content, userId}) => {
  const postWithoutId = { title, content, userId };
  return postWithoutId;
};

module.exports = removePostId;