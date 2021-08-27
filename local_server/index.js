const fs = require('fs');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const resolvers = require('./resolvers');
const typeDefs = fs.readFileSync(__dirname + '/schema.graphql', {
  encoding: 'utf-8',
});

startApolloServer(typeDefs, resolvers);

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
