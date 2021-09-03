const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Authors = sequelize.define(
  "authors",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

module.exports = Authors;
