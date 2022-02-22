const removePostUserId = ({ id, title, content, published, updated }) => {
  console.log(id, title)
  const postWithoutUserId = { id, title, content, published, updated };
  return postWithoutUserId;
};

module.exports = removePostUserId;