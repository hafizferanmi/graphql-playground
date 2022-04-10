"use strict";

const { DataTypes } = require("sequelize");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("permissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.ENUM,
      },
      name: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("permissions");
  },
};
