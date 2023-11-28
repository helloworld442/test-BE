const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Like", likesSchema);
