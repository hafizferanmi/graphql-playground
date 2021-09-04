const Query = require("../businesslogic/queries");
const Mutation = require("../businesslogic/mutations");
const BookResolver = require("../businesslogic/types/book.resolver");
const LibraryResolver = require("../businesslogic/types/library.resolver");
const AuthorResolver = require("../businesslogic/types/author.resolver");

const resolvers = {
  Query,
  Mutation,
  Book: BookResolver,
  Library: LibraryResolver,
  Author: AuthorResolver,
};

module.exports = resolvers;
