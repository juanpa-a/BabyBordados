const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: mongoose.Decimal128,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    }
  });

// convierte el id en string.
mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

module.exports = ProductSchema;