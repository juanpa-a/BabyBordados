// paquetes que necesitamos importar
const JWT = require('jsonwebtoken');
const { UserModel } = require('../dataBase/models');

const { SchemaDirectiveVisitor, AuthenticationError } = require('apollo-server-express');

// directiva - valida si esta query necesita un token, de lo contrario no permite ejecutar la consulta
class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const ctx = args[2];
      if (ctx.user) {
        return await resolve.apply(this, args);
      } else {
        throw new AuthenticationError("You need to be logged in.");
      }
    };
  }
}

// contexto
// para autorizar request se hacen los siguientes pasos
// paso 1 - saca el autorization de los headers en el request
// paso 2 - valida si el header token esta indefinido
// paso 3 - verifica que el token sea valido
// paso 4 - si es un token valido busca al usuario en la base de datos y asigna la informacion del usuario en el contexto
// paso 5 - si hay algun error siempre regresa lo que trae req
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
  AuthDirective,
}