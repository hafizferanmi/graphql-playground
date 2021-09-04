const BooksModel = require("../../models/books");

const books = async ({ id }) => {
  const books = await BooksModel.findAll({ where: { authorId: id } });
  return books;
};

module.exports = {
  books,
};
