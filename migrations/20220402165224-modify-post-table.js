"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "posts",
        "premium",
        {
          type: DataTypes.BOOLEAN,
          default: false,
        },
        { transaction }
      );
      await queryInterface.changeColumn(
        "posts",
        "desc",
        {
          type: DataTypes.TEXT,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("posts", "premium", { transaction });
      await queryInterface.changeColumn(
        "posts",
        "desc",
        {
          type: DataTypes.STRING,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
