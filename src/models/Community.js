const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const CommentSchema = new mongoose.Schema({
  commentId: { type: Number, unique: true }, // Auto-incrementing ID for comments
  userId: { type: Number, required: true }, // ID of the user commenting
  content: { type: String, required: true }, // Comment content
  createdAt: { type: Date, default: Date.now },
});

const CommunitySchema = new mongoose.Schema({
  postId: { type: Number, unique: true }, // Auto-incrementing post ID
  userId: { type: Number, required: true }, // ID of the user creating the post
  title: { type: String, required: true }, // Post title
  content: { type: String, required: true }, // Post content
  comments: { type: [CommentSchema], default: [] }, // Array of comments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add auto-incrementing IDs
CommunitySchema.plugin(AutoIncrement, { inc_field: "postId" });
CommentSchema.plugin(AutoIncrement, { inc_field: "commentId" });

module.exports = mongoose.model("Community", CommunitySchema);
