const { gql } = require("apollo-server");

const Book = gql`
  "A book describe the properties of a book"
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
    "Mutation to create a new book with title and author"
    createBook(title: String!, authorId: Int!): Book
  }
`;

module.exports = Book;
