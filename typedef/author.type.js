const { gql } = require("apollo-server");

const Author = gql`
  type Author {
    id: ID!
    name: String
    books: [Book]
  }

  extend type Query {
    authors: [Author]
  }

  extend type Mutation {
    createAuthor(name: String!): Author
  }
`;

module.exports = Author;
