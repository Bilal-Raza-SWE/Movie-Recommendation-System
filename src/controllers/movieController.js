const Movie = require("../models/Movie");

// Add a new movie
const addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res
      .status(200)
      .json({ message: `Movie '${updatedMovie.name}' updated successfully!` });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res
      .status(200)
      .json({ message: `Movie '${deletedMovie.name}' deleted successfully!` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error!" });
  }
};

// Fetch movie Details by ID
const getMovieDetails = async (req, res) => {
  try {
    const { movieId } = req.params;

    if (!movieId) {
      return res.status(404).json({ message: "Movie ID is required" });
    }

    res
      .status(200)
      .json({
        message: `Movie '${Movie.name}' '${movieId}' has been fetched successfully with id ${movieId}`,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch a movie by pagination
const getMovieByPagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    // Fetch movies with pagination
    const movies = await Movie.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalMovies = await Movie.countDocuments();

    res.status(200).json({
      total: totalMovies,
      page: parseInt(page),
      limit: parseInt(limit),
      movies,
    });

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addMovie, updateMovie, deleteMovie, getMovieDetails,getMovieByPagination };
