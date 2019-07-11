const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const comment = new Schema ({
    content: {
        type: String,
        required: true,
    },
    posted_by : {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    }
});

const Comment = mongoose.model('Comment', comment);
module.exports = Comment;