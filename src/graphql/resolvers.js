
const User    = require("../models/User");
const Product = require("../models/Product");
const Comment = require("../models/Comments");

const jwt     = require("jsonwebtoken");
const bcrypt  = require("bcryptjs")

const resolvers = {
  Query: {
    hi: () => {"hi there!"},
    test: () => {"test"},
  },
  Mutation: {

    register: (_, {user_info: { name, email, lastname, password }} ) => {

      const user = new User({
        name: name,
        email: email,
        lastname: lastname,
        password: password,
      });
      try{
        user.save();
        return { 
          token: jwt.sign(user.toJSON(), process.env.SECRET, {expiresIn: "15min"}), 
          message: `Successfully registered: ${name}.` 
        };
      } catch(error) {
        return { token: "", message: `User not reistered: ${error}` };
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
      }
      return {
        token: jwt.sign(payload, process.env.SECRET, {expiresIn: "15min"}), 
        message: `Successfully logged: ${email} in!`
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
  }
};

module.exports = resolvers;