"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Tags extends Model {
    static associate(models) {
      Tags.belongsToMany(models.posts, {
        foreignKey: "tagId",
        through: "posts_tags",
      });
    }
  }
  Tags.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tags",
    }
  );
  return Tags;
};
