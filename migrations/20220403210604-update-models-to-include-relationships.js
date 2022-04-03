"use strict";
const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        "posts",
        "userId",
        {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "comments",
        "userId",
        {
          type: DataTypes.INTEGER,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
        },
        { transaction }
      );
      await queryInterface.addColumn(
        "comments",
        "postId",
        {
          type: DataTypes.INTEGER,
          references: {
            model: "posts",
            key: "id",
          },
          onDelete: "CASCADE",
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
      await queryInterface.removeColumn("posts", "userId", {
        transaction,
      });
      await queryInterface.removeColumn("comments", "userId", {
        transaction,
      });
      await queryInterface.removeColumn("comments", "postId", {
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
