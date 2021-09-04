const AuthorsModel = require("../../models/authors");
const LibraryModel = require("../../models/library");

const author = async ({ authorId }, input) => {
  const author = await AuthorsModel.findByPk(authorId);
  return author;
};

const library = async ({ libraryId }) => {
  const library = await LibraryModel.findByPk(libraryId);
  return library;
};

module.exports = {
  author,
  library,
};
