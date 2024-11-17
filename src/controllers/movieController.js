const Movie = require("../models/Movie");

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie added successfully", Movie: movie });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateMovie = async (req, res) => {
  try {
    console.log("Update Movie - Body:", req.body);
    console.log("Request Params:", req.params);

    const { id } = req.params; // Extract "id" from params
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const numericId = parseInt(id, 10); // Convert "id" to a number
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Movie ID must be a number" });
    }

    const updatedData = req.body;

    // Find movie by ID and update it
    const updatedMovie = await Movie.findOneAndUpdate(
      { id: numericId },
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation on the updated data
      }
    );

    console.log("Update Movie - Updated Movie:", updatedMovie);

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie updated successfully",
      Movie: updatedMovie,
    });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  try {
    console.log("Request Params:", req.params);

    const { id } = req.params; // Extract "id" from request parameters
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const numericId = parseInt(id, 10); // Ensure the "id" is a number
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Movie ID must be a number" });
    }

    // Find movie by ID and delete it
    const deletedMovie = await Movie.findOneAndDelete({ id: numericId });

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      Movie: deletedMovie,
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch movie Details by ID
const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract "id" from the request parameters

    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const numericId = parseInt(id, 10); // Ensure the ID is a number
    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Movie ID must be a valid number" });
    }

    // Fetch the movie from the database
    const movie = await Movie.findOne({ id: numericId });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: `Movie '${movie.title}' has been fetched successfully`,
      Movie: movie,
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Fetch movies by pagination
const getMovieByPagination = async (req, res) => {
  try {
    // Extract query parameters with defaults
    const { page = 1, limit = 10 } = req.query;

    // Ensure query parameters are integers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    if (isNaN(pageNumber) || pageNumber <= 0) {
      return res.status(400).json({ message: "Page must be a positive integer" });
    }

    if (isNaN(limitNumber) || limitNumber <= 0) {
      return res.status(400).json({ message: "Limit must be a positive integer" });
    }

    // Fetch movies with pagination
    const movies = await Movie.find()
      .skip((pageNumber - 1) * limitNumber) // Skip documents for pagination
      .limit(limitNumber); // Limit the number of results

    const totalMovies = await Movie.countDocuments(); // Get total count of movies

    res.status(200).json({
      total: totalMovies,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(totalMovies / limitNumber), // Calculate total pages
      movies,
    });
  } catch (error) {
    console.error("Error fetching movies by pagination:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { addMovie,getAllMovies, updateMovie, deleteMovie, getMovieDetails,getMovieByPagination };
