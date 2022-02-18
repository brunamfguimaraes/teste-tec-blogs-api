module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.UUID, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false, tableName: 'Posts' });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      foreignKey: 'userId', as: 'user' });
  };

  return Post;
};