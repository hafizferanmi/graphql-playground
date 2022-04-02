"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn("comments", "published", {
        type: DataTypes.BOOLEAN,
        default: true,
      });
    } catch (err) {
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn("comments", "published");
    } catch (err) {
      throw err;
    }
  },
};
