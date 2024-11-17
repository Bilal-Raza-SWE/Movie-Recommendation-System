const express = require("express");
const { searchAndFilterMovies } = require("../controllers/searchandfilterController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Search and filter movies
router.get("/searchandFilter", authMiddleware, searchAndFilterMovies);

module.exports = router;
