"use strict";
const { faker } = require("@faker-js/faker");

const generateComments = (count = 300) => {
  const comments = [];
  for (let index = 0; index < count; index++) {
    comments.push({
      body: faker.random.words(faker.datatype.number({ min: 15, max: 300 })),
      userId: faker.datatype.number({ min: 1, max: 20 }),
      postId: faker.datatype.number({ min: 1, max: 20 }),
      published: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return comments;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("comments", generateComments(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
  },
};
