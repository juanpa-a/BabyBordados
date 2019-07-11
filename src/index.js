const { ApolloServer } = require('apollo-server');
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const startServer = async () => {
  await mongoose.connect(process.env.URL_DATABASE, {useCreateIndex: true, useNewUrlParser: true});
  const server = new ApolloServer({ typeDefs, resolvers });
  
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

startServer();  