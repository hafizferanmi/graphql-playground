const Query = require("./queries");
const Mutation = require("./mutations");
const Types = require("./resolvers");

module.exports = {
  Query,
  Mutation,
  ...Types,
};
