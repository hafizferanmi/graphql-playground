"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class PostsTags extends Model {
    static associate(models) {
      PostsTags.belongsTo(models.posts, {
        foreignKey: "postId",
        as: "posts",
      });
      PostsTags.belongsTo(models.tags, {
        foreignKey: "tagId",
        as: "tags",
      });
    }
  }
  PostsTags.init(
    {
      postId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts_tags",
    }
  );
  return PostsTags;
};
