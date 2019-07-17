const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
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
    },
    comments: {
        type: [Schema.Types.ObjectId],
        ref: "Comment",
    }
});

const Product = mongoose.model('Product', product);
module.exports = Product;