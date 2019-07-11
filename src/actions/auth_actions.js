const jwt = require("jsonwebtoken");
const { User } = require("../models/User");

const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');

class Auth extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {

      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function (...args) {
        const context = args[2];
        console.log(context);
        if (context.user) {
          console.log("hello!");
          return await resolve.apply(this, args);
        } else {
          console.log("bbye");
          
          throw new AuthenticationError("You need to be logged in.");
        }
      };
    }
  }

  class Test extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {

      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function (...args) {
        const context = args[2];
        console.log(context);
        if (context.user) {
          console.log("hello!");
          return await resolve.apply(this, args);
        } else {
          console.log("bbye");
          
          throw new AuthenticationError("You need to be logged in.");
        }
      };
    }
  }


  
  const getContext = (req) => {
    const token = req.headers.authorization;
    if (typeof token === typeof undefined) return req;
    return JWT.verify(token, process.env.SECRET, function (err, result) {
      if (err) return req;
      return UserModel.findOne({ _id: result._id }).then((user) => {
        return { ...req, user };
      });
    });
  }
  
  module.exports = {
    getContext,
    Auth,
    Test
  }