const removePostUserId = ({ id, title, content, published, updated }) => {
  const postWithoutUserId = { id, title, content, published, updated };
  return postWithoutUserId;
};

module.exports = removePostUserId;
