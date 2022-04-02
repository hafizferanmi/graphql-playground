"use strict";

const { faker } = require("@faker-js/faker");
const _ = require("lodash");

const generatePosts = (count = 30) => {
  const posts = [];
  for (let index = 0; index < count; index++) {
    posts.push({
      title: faker.random.words(faker.datatype.number({ min: 4, max: 10 })),
      desc: faker.random.words(faker.datatype.number({ min: 30, max: 50 })),
      published: faker.datatype.boolean(),
      userId: faker.datatype.number({ min: 1, max: 20 }),
      premium: faker.datatype.boolean(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return posts;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("posts", generatePosts(), {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("posts", null, {});
  },
};
