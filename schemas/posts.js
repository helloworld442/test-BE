const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  nickname: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  imageUrl: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postsSchema);
