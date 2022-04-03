"use strict";
const { faker } = require("@faker-js/faker");

const generateTags = (count = 10) => {
  const tags = [];
  for (let index = 0; index < count; index++) {
    tags.push({
      name: faker.random.word(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return tags;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tags", generateTags(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tags", null, {});
  },
};
