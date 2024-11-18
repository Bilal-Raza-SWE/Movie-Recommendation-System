const express = require("express");
const { getAwardsByMovie, addAward } = require("../controllers/awardController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Fetch awards by movie ID
router.get("/get/:movieId", authMiddleware, getAwardsByMovie);

// Add an award
router.post("/add", authMiddleware, adminMiddleware, addAward);

module.exports = router;
