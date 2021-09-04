const BooksModel = require("../../models/books");

exports.books = async (_, input, ctx, info) => {
  const books = await BooksModel.findAll();
  return books;
};

exports.book = async (_, { id }, ctx, info) => {
  const book = await BooksModel.findByPk(id);
  return book;
};
