const AuthorsModel = require("../../models/authors");

exports.authors = async (_, input, ctx, info) => {
  const authors = await AuthorsModel.findAll();
  return authors;
};
