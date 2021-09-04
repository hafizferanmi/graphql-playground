const { gql } = require("apollo-server");
const BookType = require("./book.type");
const LibraryType = require("./library.type");
const AuthorType = require("./author.type");

const Query = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

module.exports = [Query, BookType, LibraryType, AuthorType];
