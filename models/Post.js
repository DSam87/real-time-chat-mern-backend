const mongoose = require("mongoose");
const { Schema } = mongoose;

const Post = new Schema(
  {
    text: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
