const express = require("express");
const { getBoxOfficeData, addBoxOfficeData } = require("../controllers/boxOfficeController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddlewear = require("../middleware/adminMiddleware");

const router = express.Router();

// Fetch box office data by movie ID
router.get("/get/:movieId", authMiddleware, getBoxOfficeData);

// Add box office data
router.post("/add", authMiddleware, adminMiddlewear, addBoxOfficeData);

module.exports = router;
