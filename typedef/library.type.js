const { gql } = require("apollo-server");

const Library = gql`
  type Library {
    id: ID!
    name: String
    books: [Book]
    address: String
  }

  extend type Query {
    libraries: [Library]
  }

  extend type Mutation {
    createLibrary(name: String!, address: String): Library
  }
`;

module.exports = Library;
