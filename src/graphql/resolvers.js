
const User    = require("../models/User");
const Product = require("../models/Product");
const Comment = require("../models/Comments");

const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcryptjs")

const resolvers = {
  Query: {
    hi: () => "hi there!",
    test: () => "test",
  },
  Mutation: {

    register: (_, {user_info: { name, email, lastname, password, type }} ) => {

      const user = new User({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        type: type,
      });
      try{
        user.save();
        return { 
          token: jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: "1d"}), 
          message: `Successfully registered: ${name}.` 
        };
      } catch(error) {
        return { token: "", message: `User not registered: ${error}` };
      }
    },

    add_employee: (_, {user_info: { name, email, lastname, password,  }} ) => {

      const user = new User({
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        type: "employee",
      });
      try{
        user.save();
        return { 
          token: jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: "1d"}), 
          message: `Successfully registered: ${name}.` 
        };
      } catch(error) {
        return { token: "", message: `User not registered: ${error}` };
      }
    },

    login: async (_, { login_info: { email, password }}) => {

      const user = await User.findOne({ email: email });
      if (!user) {
        return { token: "", message: `Email ${email} was not found.` };
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return { token: "", message: "Wrong password." };
      }
      const payload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        type: user.type
      }
      return {
        token: jwt.sign(payload, process.env.SECRET, {expiresIn: "1d"}), 
        message: `Successfully logged ${email} in!`
      };
    },

    add_product: (_, { product_info: { name, price, stock, description, photo } } ) => {

      const product = new Product({
        name: name,
        price: price,
        stock: stock,
        description: description,
        photo: photo,
      });

      try {
        product.save();
        return {message: `Successfully registered ${name}`};
      }
      catch(error) {
        return {message: `Something wen't wrong: ${error}`}
      }
    },

    

    change_product_stock: (_, { product_info: { name, stock } }) => {
      try {
        Product.findOneAndUpdate({name: name}, {stock: stock }).then(function(res) {
          assert(res === stock);
          done();
        })
      } catch(error) {
        throw new Error(error);
      }
    },

    change_product_price: (_, { product_info: { name, price } }) => {
      try {
        Product.findOneAndUpdate({name: name}, {price: price }).then(function(res) {
          assert(res === price);
          done();
        })
      } catch(error) {
        throw new Error(error);
      }
    },

    delete_product: (_, { product_info: {id}}) => {
      Product.findByIdAndRemove({id: id}, (error, _)=>{
        if(error){
          return {message: error};
        } else {
          return { message: "Product deleted" };
        }
      }); 
    },

    post_comment: (_, { comment_info: { content, posted_by } }) => {
      const comment = new Comment({
        content: content,
        posted_by: posted_by,
      });

      try {
        comment.save();
        return { message: `Comment posted!` };
      } 
      catch(error) {
        return { message: `Something went wrong: ${error}` };
      }
    },

    delete_comment: (_, { comment_info: {id}}) => {
      Comment.findByIdAndRemove({id: id}, (error, _)=>{
        if(error){
          return {message: error};
        } else {
          return { message: "Comment deleted" };
        }
      }); 
    },
  }
};

module.exports = resolvers;