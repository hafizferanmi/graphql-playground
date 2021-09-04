const BooksMutation = require("./books.mutations");
const LibraryMutation = require("./libraries.mutations");
const AuthorsMutation = require("./authors.mutations");

module.exports = Object.assign(
  {},
  BooksMutation,
  LibraryMutation,
  AuthorsMutation
);
