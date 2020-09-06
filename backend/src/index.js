const { ApolloServer } = require("apollo-server");
const dotenv = require("dotenv");

dotenv.config();

const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");
const formatError = require("./graphQL/errors");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
