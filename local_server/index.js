const fs = require('fs');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers');
const typeDefs = fs.readFileSync(__dirname + '/schema.graphql', {
  encoding: 'utf-8',
});

startApolloServer(typeDefs, resolvers);

async function startApolloServer(typeDefs, resolvers) {
  // Same ApolloServer initialization as before
  const server = new ApolloServer({ typeDefs, resolvers });

  // Required logic for integrating with Express
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  // Modified server startup
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
