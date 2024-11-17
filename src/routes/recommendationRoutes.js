const express = require("express");
const { getRecommendations, getSimilarTitles } = require("../controllers/recommendationController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Fetch recommendations for a user
router.get("/get/:userId", authMiddleware, getRecommendations);

// Fetch similar titles for a movie
router.get("/similiar/:movieId", authMiddleware, getSimilarTitles);

module.exports = router;
