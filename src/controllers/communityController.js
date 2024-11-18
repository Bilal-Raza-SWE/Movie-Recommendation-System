const Community = require("../models/Community");

// Create a new post
const createPost = async (req, res) => {
  try {
    const { userId, title, content } = req.body;

    if (!userId || !title || !content) {
      return res.status(400).json({ message: "User ID, title, and content are required." });
    }

    const newPost = new Community({ userId, title, content });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully.", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update an existing post
const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatedPost = await Community.findOneAndUpdate(
      { postId },
      { title, content, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post updated successfully.", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const deletedPost = await Community.findOneAndDelete({ postId });

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Add a comment to a post
const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId, content } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ message: "User ID and comment content are required." });
    }

    const post = await Community.findOne({ postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const newComment = { userId, content, createdAt: Date.now() };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: "Comment added successfully.", post });
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = { createPost, updatePost, deletePost, addComment };