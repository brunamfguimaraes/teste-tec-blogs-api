const removeUserPass = ({ id, email, displayName, image }) => {
  const userWithoutPass = {
    id,
    displayName,
    email,
    image,
  };
  return userWithoutPass;
};

module.exports = removeUserPass;