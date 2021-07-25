const { gql, ApolloServer } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { books, libraries, authors, addresses } = require("./data");

const typeDefs = gql`
  type Author {
    name: String
    books: [Book]
  }
  type Book {
    title: String
    author: Author
    library: Library
  }
  type Library {
    name: String
    books(genre: String): [Book]
    address: String
  }
  type Query {
    greeting: String
    libraries: [Library]
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    greeting: () => "Welcome to my graphql playground",
    libraries: (parent, args, context, info) => {
      return libraries;
    },
    books: () => books,
  },
  Book: {
    library: (book, args, context, info) => {
      return libraries.find((library) => book.library == library.id);
    },
    author: (book) => authors.find((author) => author.id == book.author),
  },
  Library: {
    address: (library, args, context, info) => {
      return addresses[library.id];
    },
    books: (library, args, context, info) => {
      return books.filter((book) => book.library === library.id);
    },
  },
  Author: {
    books: (author) => books.filter((book) => book.author === author.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
});

server.listen(4200).then(() => console.log("App running!!"));
