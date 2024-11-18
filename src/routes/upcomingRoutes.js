const express = require("express");
const { getUpcomingMovies, notifyUsersAboutReleases} = require("../controllers/upcomingController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Fetch upcoming movies
router.get("/new", authMiddleware, adminMiddleware, getUpcomingMovies);

// Notify users about upcoming movies
router.post("/notify", authMiddleware, adminMiddleware, notifyUsersAboutReleases);

module.exports = router;
