"use strict";
const { faker } = require("@faker-js/faker");

const generatePostsTags = (count = 500) => {
  const tags = [];
  for (let index = 0; index < count; index++) {
    tags.push({
      postId: faker.datatype.number({ min: 1, max: 300 }),
      tagId: faker.datatype.number({ min: 1, max: 10 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return tags;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("posts_tags", generatePostsTags(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts_tags", null, {});
  },
};
