// const Review = require('../models/Review');

// //Add rating
// const addRating = async (req, res) => {
//   try {
//     const { movieId, rating } = req.body;
//     const userId = req.user.userId; // Extract the userId from the request

//     // Check if the user has already rated this movie using user-defined IDs
//     const existingReview = await Review.findOne({ movieId, userId });
//     if (existingReview) {
//       return res
//         .status(400)
//         .json({ message: "Rating already exists. Please update it instead." });
//     }

//     // Add a new rating
//     const review = new Review({ movieId, userId, rating });
//     await review.save();

//     res.status(201).json({ message: "Rating added successfully!", review });
//   } catch (error) {
//     console.error("Error adding rating:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Update the rating
// const updateRating = async (req, res) => {
//   try {
//     const { movieId, rating } = req.body;
//     const userId = req.user.userId; // Extract the userId from the request

//     // Find the review by movieId and userId
//     const review = await Review.findOne({ movieId, userId });
//     if (!review) {
//       return res
//         .status(404)
//         .json({ message: "Rating not found. Please add a rating first." });
//     }

//     // Update the rating
//     review.rating = rating;
//     review.updatedAt = Date.now();
//     await review.save();

//     res.status(200).json({ message: "Rating updated successfully!", review });
//   } catch (error) {
//     console.error("Error updating rating:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Add a new review
// const addReview = async (req, res) => {
//   try {
//     const { movieId, rating, reviewText } = req.body;
//     const userId = req.user.userId;

//     // Ensure movieId and userId are numeric
//     if (isNaN(movieId) || isNaN(userId)) {
//       return res.status(400).json({ message: "Invalid movieId or userId." });
//     }

//     // Check if the user has already reviewed this movie
//     const existingReview = await Review.findOne({ movieId, userId });
//     if (existingReview) {
//       return res.status(400).json({ message: "Review already exists. Please update it instead." });
//     }

//     // Add a new review
//     const review = new Review({ movieId, userId, rating, reviewText });
//     await review.save();

//     res.status(201).json({ message: "Review added successfully!", review });
//   } catch (error) {
//     console.error("Error adding review:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// //update reviewconst
// const updateReview = async (req, res) => {
//   try {
//     const { movieId, rating, reviewText } = req.body;
//     const userId = req.user.userId; // Extract the userId from the request

//     // Find the review by movieId and userId
//     const review = await Review.findOne({ movieId, userId });
//     if (!review) {
//       return res
//         .status(404)
//         .json({ message: "Review not found. Please add a review first." });
//     }

//     // Update the review
//     review.rating = rating;
//     review.reviewText = reviewText;
//     review.updatedAt = Date.now();
//     await review.save();

//     res.status(200).json({ message: "Review updated successfully!", review });
//   } catch (error) {
//     console.error("Error updating review:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// // Fetch Reviews By nmovie id
// const getReviewsByMovieId = async (req, res) => {
//   try {
//     const { movieId } = req.params;

//     // Ensure movieId is numeric
//     if (isNaN(movieId)) {
//       return res.status(400).json({ message: "Invalid movieId." });
//     }

//     // Fetch reviews
//     const reviews = await Review.find({ movieId }).populate("userId", "name email").sort("-createdAt");
//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error("Error fetching reviews:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };


// // Fetch Review Highlights
// const getReviewHighlights = async (req, res) => {
//   try {
//     const { movieId } = req.params; // Use user-defined movieId

//     // Fetch top-rated reviews
//     const topRatedReviews = await Review.find({ movieId })
//       .sort("-rating -createdAt")
//       .limit(3)
//       .populate("userId", "name");

//     res.status(200).json({ message: "Top Rated Reviews", topRatedReviews });
//   } catch (error) {
//     console.error("Error fetching review highlights:", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };



// module.exports = { addRating, updateRating, addReview, updateReview, getReviewsByMovieId, getReviewHighlights };


const Review = require("../models/Review");
const Movie = require("../models/Movie");

// Add or update a review
const addOrUpdateReview = async (req, res) => {
  try {
    const { movieId, userId, rating, reviewText } = req.body;

    if (!movieId || !userId || !rating) {
      return res.status(400).json({ message: "movieId, userId, and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    let review = await Review.findOne({ movieId, userId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.reviewText = reviewText;
      review.updatedAt = Date.now();
      await review.save();
    } else {
      // Add a new review
      review = new Review({ movieId, userId, rating, reviewText });
      await review.save();
    }

    // Update the average rating of the movie
    const reviews = await Review.find({ movieId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Movie.findOneAndUpdate({ id: movieId }, { averageRating });

    res.status(200).json({
      message: "Review saved successfully",
      review,
    });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateReview = async (req, res) => {
  try {
    const { movieId, userId, rating, reviewText } = req.body;

    if (!movieId || !userId || !rating) {
      return res.status(400).json({ message: "movieId, userId, and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    let review = await Review.findOne({ movieId, userId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.reviewText = reviewText;
      review.updatedAt = Date.now();
      await review.save();
    } else {
      // Add a new review
      review = new Review({ movieId, userId, rating, reviewText });
      await review.save();
    }

    // Update the average rating of the movie
    const reviews = await Review.find({ movieId });
    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Movie.findOneAndUpdate({ id: movieId }, { averageRating });

    res.status(200).json({
      message: "Review updated successfully",
      review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch reviews for a specific movie
const getReviewsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    const reviews = await Review.find({ movieId });

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this movie" });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch review highlights (top-rated and most-discussed reviews)
const getReviewHighlights = async (req, res) => {
  try {
    const topRatedReviews = await Review.aggregate([
      { $sort: { rating: -1, updatedAt: -1 } },
      { $limit: 5 },
    ]);

    const mostDiscussedMovies = await Review.aggregate([
      { $group: { _id: "$movieId", reviewCount: { $sum: 1 } } },
      { $sort: { reviewCount: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json({
      topRatedReviews,
      mostDiscussedMovies,
    });
  } catch (error) {
    console.error("Error fetching review highlights:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { movieId, userId } = req.params;

    if (!movieId || !userId) {
      return res.status(400).json({ message: "movieId and userId are required" });
    }

    const review = await Review.findOneAndDelete({ movieId, userId });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Recalculate movie's average rating
    const reviews = await Review.find({ movieId });
    const averageRating = reviews.length
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

    await Movie.findOneAndUpdate({ id: movieId }, { averageRating });

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addOrUpdateReview,
  updateReview,
  getReviewsByMovie,
  getReviewHighlights,
  deleteReview,
};
