"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Posts extends Model {
    static associate(models) {
      Posts.belongsTo(models.users);
      Posts.hasMany(models.comments);
      Posts.belongsToMany(models.tags, {
        foreignKey: "postId",
        through: "posts_tags",
      });
    }
    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }
  Posts.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
          len: { args: [5], msg: "Title must be at least 5 characters" },
        },
      },
      desc: DataTypes.TEXT,
      published: { type: DataTypes.BOOLEAN, defaultValue: true },
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return Posts;
};
