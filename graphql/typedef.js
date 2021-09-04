const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String
    books: [Book]
  }
  type Book {
    id: ID!
    title: String
    author: Author
    library: Library
  }
  type Library {
    id: ID!
    name: String
    books: [Book]
    address: String
  }
  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    libraries: [Library]
  }
  type Mutation {
    createAuthor(name: String!): Author
    createBook(title: String!, authorId: Int!): Book
    createLibrary(name: String!, address: String): Library
  }
`;

module.exports = typeDefs;
