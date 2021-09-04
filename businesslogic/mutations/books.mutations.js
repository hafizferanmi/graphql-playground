const BooksModel = require("../../models/books");

exports.createBook = async (_, { authorId, title }, ctx, info) => {
  const book = await BooksModel.create({ title, authorId });
  return book;
};
