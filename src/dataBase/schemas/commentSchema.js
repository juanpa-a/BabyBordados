const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    user_id: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    }
  });

// convierte el id en string.
mongoose.Types.ObjectId.prototype.valueOf = function () {
  return this.toString();
};

// exporta el CommentSchema
module.exports = CommentSchema;