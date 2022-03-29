const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Books = sequelize.define(
  "books",
  {
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    libraryId: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);

module.exports = Books;
