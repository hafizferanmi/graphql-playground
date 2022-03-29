const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Library = sequelize.define(
  "libraries",
  {
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {}
);

module.exports = Library;
