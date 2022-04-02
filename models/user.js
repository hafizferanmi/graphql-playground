"use strict";
const { Model } = require("sequelize");
const crypto = require("crypto");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.posts);
      User.hasMany(models.comments);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      setterMethods: {
        password: function (value) {
          const salt = crypto.randomBytes(16).toString("hex");
          const hashedPassword = crypto
            .pbkdf2Sync(value, salt, 1000, 64, `sha512`)
            .toString(`hex`);

          this.setDataValue("password", hashedPassword);
        },
      },
      sequelize,
      modelName: "users",
    }
  );
  return User;
};
