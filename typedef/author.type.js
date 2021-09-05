const { gql } = require("apollo-server");

const Author = gql`
  "Author gives information about a particular author"
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
