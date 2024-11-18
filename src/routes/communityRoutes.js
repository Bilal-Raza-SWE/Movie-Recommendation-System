const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  addComment,
} = require("../controllers/communityController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new post
router.post("/create", authMiddleware, createPost);

// Update a post
router.put("/update/:postId", authMiddleware, updatePost);

// Delete a post
router.delete("/delete/:postId", authMiddleware, deletePost);

// Add a comment to a post
router.post("/comment/:postId", authMiddleware, addComment);

module.exports = router;
