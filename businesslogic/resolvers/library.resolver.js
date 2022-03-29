const BooksModel = require("../../models-old/books");

const books = async ({ id }) => {
  const books = await BooksModel.findAll({ where: { libraryId: id } });
  return books;
};

module.exports = {
  books,
};
