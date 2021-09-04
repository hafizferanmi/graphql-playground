const BooksQuery = require("./books.query");
const LibraryQuery = require("./libraries.query");
const AuthorQuery = require("./authors.query");

module.exports = Object.assign({}, BooksQuery, LibraryQuery, AuthorQuery);
