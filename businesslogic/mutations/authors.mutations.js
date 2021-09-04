const AuthorsModel = require("../../models/authors");

exports.createAuthor = async (_, { name }, ctx, info) => {
  const author = await AuthorsModel.create({ name });
  return author;
};
