const jwt = require("jsonwebtoken");
const User = require("../models/User")
const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');

class IsLoggedIn extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        if (User.findOne({id: args[2].id})) {
          return await resolve.apply(this, args);
        } else {
          throw new AuthenticationError("You need to be logged in.");
        }
      };
    }
  }

  class IsAdmin extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        if ( args[2].type === "admin") {
          return await resolve.apply(this, args);
        } else {
          throw new AuthenticationError("You don't have permission to do this.");
        }
      };
    }
  }

  class IsEmployee extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        if ( args[2].type === "employee") {
          return await resolve.apply(this, args);
        } else {
          throw new AuthenticationError("You don't have permission to do this.");
        }
      };
    }
  }
  
  const getContext = (req) => {
    const token = req.headers.authorization;
    if (typeof token === typeof undefined) return req;
    return jwt.verify(token, process.env.SECRET);
  }
  
  module.exports = {
    IsLoggedIn,
    IsAdmin,
    IsEmployee,
    getContext,
  }