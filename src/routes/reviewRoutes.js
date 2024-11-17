// const express = require('express');
// const { addRating, updateRating, addReview, updateReview, getReviewsByMovieId, getReviewHighlights} = require('../controllers/reviewController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// // Add a rating
// router.post("/addRating", authMiddleware, addRating);

// // Update a rating
// router.put("/updateRating", authMiddleware, updateRating);

// // Add a review
// router.post('/addReview', authMiddleware, addReview);

// // Update a review
// router.put('/updateReview', authMiddleware, updateReview);

// // Fetch reviews for a movie
// router.get('/fetchByMovieId/:movieId', getReviewsByMovieId);

// // Fetch review highlights for a movie
// router.get('/:movieId/highlights', getReviewHighlights);

// module.exports = router;


const express = require("express");
const {
  addOrUpdateReview,
  getReviewsByMovie,
  updateReview,
  getReviewHighlights,
  deleteReview,
} = require("../controllers/reviewController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Add or update a review
router.post("/add", authMiddleware, addOrUpdateReview);
router.post("/update", updateReview);

// Get reviews for a specific movie
router.get("/getreview/:movieId", authMiddleware, getReviewsByMovie);

// Get review highlights
router.get("/gethighlight", authMiddleware, getReviewHighlights);

// Delete a review
router.delete("/delete/:movieId/:userId", authMiddleware, deleteReview);

module.exports = router;
