const User = require("../models/User");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

// Fetch personalized recommendations for a user
const getRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    // Fetch user preferences
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { preferences } = user; // Assume preferences contain preferred genres

    // Fetch movies matching user preferences
    const preferredMovies = await Movie.find({ genre: { $in: preferences } }).limit(10);

    // Fetch trending movies (highest rated in the past week)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const trendingMovies = await Movie.find({ updatedAt: { $gte: oneWeekAgo } })
      .sort({ averageRating: -1 })
      .limit(10);

    res.status(200).json({
      personalized: preferredMovies,
      trending: trendingMovies,
    });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Fetch "Similar Titles" for a given movie
const getSimilarTitles = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    const movie = await Movie.findOne({ id: movieId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const { genre, director } = movie;

    // Find similar movies by genre and director
    const similarMovies = await Movie.find({
      $or: [
        { genre: { $in: genre } },
        { director: { $regex: director, $options: "i" } },
      ],
      id: { $ne: movieId }, // Exclude the current movie
    })
      .sort({ popularity: -1 }) // Sort by popularity
      .limit(10);

    res.status(200).json({ similarMovies });
  } catch (error) {
    console.error("Error fetching similar titles:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  getRecommendations,
  getSimilarTitles
};
