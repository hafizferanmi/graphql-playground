const { ApolloServer } = require("apollo-server");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const typeDefs = require("./graphql/typedef");
const resolvers = require("./graphql/resolvers");

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
