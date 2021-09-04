const { gql } = require("apollo-server");

const Book = gql`
  type Book {
    id: ID!
    title: String
    author: Author
    library: Library
  }

  extend type Query {
    books: [Book]
    book(id: ID!): Book
  }

  extend type Mutation {
    createBook(title: String!, authorId: Int!): Book
  }
`;

module.exports = Book;
