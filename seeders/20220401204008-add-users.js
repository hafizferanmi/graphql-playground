"use strict";
const { faker } = require("@faker-js/faker");

const generateUsers = (count = 20) => {
  const users = [];
  for (let index = 0; index < count; index++) {
    users.push({
      username: faker.name.firstName(),
      email: faker.internet.email(),
      password: "hello",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return users;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = generateUsers();
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
