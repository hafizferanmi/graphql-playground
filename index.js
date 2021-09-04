const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const typeDefs = require("./typedef");
const resolvers = require("./businesslogic/resolvers");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const plugins = [ApolloServerPluginLandingPageGraphQLPlayground({})];

const server = new ApolloServer({
  schema,
  plugins,
});

server.listen(4200).then(() => console.log("App running!!"));
