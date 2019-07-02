// importamos los paquetes que vamos a utilizar
const mongoose = require('mongoose');
//importamos los esquemas
const UserSchema = require('../schemas/userSchema');
const ProductSchema = require('../schemas/productSchema');
const CommentSchema = require('../schemas/commentSchema');

// creacion de models, crea un model con el nombre de la coleccion y el esquema
const UserModel = mongoose.model("users", UserSchema);
const ProductModel = mongoose.model("product", ProductSchema);
const CommentModel = mongoose.model("comment", CommentSchema);

// exporta un objeto de modelos
module.exports = {
  UserModel,
  ProductModel,
  CommentModel,
}
