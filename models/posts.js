"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.users);
      Posts.hasMany(models.comments);
    }
  }
  Posts.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      published: { type: DataTypes.BOOLEAN, defaultValue: true },
      premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return Posts;
};
