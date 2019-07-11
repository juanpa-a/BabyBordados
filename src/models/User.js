const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Schema
const user_schema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        enum: ["admin", "employee", "user"],
        default: "user",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Actions
user_schema.pre("save", async function(next){
    try {
        const salt =  await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(this.password, salt);
        this.password = password_hash;
        next();
    } catch {
        throw new Error(error);
    }
})


const User = mongoose.model('User', user_schema);
module.exports = User;