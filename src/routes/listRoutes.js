const express = require("express");
const {
  addOrUpdateList,
  getUserLists,
  deleteList,
  getPublicLists,
  shareOrFollowList,
} = require("../controllers/customlistController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create or update a custom list
router.post("/add", authMiddleware, addOrUpdateList);

// Get all lists for a specific user
router.get("/getUserList/:userId", authMiddleware, getUserLists);

// Delete a custom list
router.delete("/delete/:listId", authMiddleware, deleteList);

// Get public lists
router.get("/getlist/public", authMiddleware, getPublicLists);

// Follow a public list
router.post("/shareFollow/list", authMiddleware, shareOrFollowList);

module.exports = router;
