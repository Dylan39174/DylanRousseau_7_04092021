const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init({
    textPost: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Post'
  })
  return Post
};