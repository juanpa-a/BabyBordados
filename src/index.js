const { ApolloServer } = require('apollo-server');
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const { IsLoggedIn, IsAdmin, IsEmployee, getContext } = require("./actions/auth_actions");

const startServer = async () => {
  await mongoose.connect(process.env.URL_DATABASE, {useCreateIndex: true, useNewUrlParser: true});
  const server = new ApolloServer({ 
    typeDefs,
    resolvers,
    schemaDirectives: {
      is_logged_in: IsLoggedIn,
      is_admin: IsAdmin,
      is_employee: IsEmployee,
    },
    context: async ({ req }) => getContext(req),
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

startServer();