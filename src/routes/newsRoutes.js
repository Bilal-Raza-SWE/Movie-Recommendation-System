const express = require("express");
const { getNews, addNews } = require("../controllers/newsController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Fetch news articles
router.get("/get", authMiddleware, getNews);

// Add a news article
router.post("/add", authMiddleware, addNews);

module.exports = router;
