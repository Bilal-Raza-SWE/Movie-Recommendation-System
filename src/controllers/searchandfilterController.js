const Movie = require("../models/Movie");

// Search and filter movies
const searchAndFilterMovies = async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      actor,
      ratingMin,
      ratingMax,
      popularityMin,
      popularityMax,
      releaseYear,
      decade,
      country,
      language,
      keywords,
    } = req.query;

    // Build the query object dynamically based on filters
    const query = {};

    // Search by title (case-insensitive)
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    // Filter by genre (case-insensitive)
    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    // Filter by director (case-insensitive)
    if (director) {
      query.director = { $regex: director, $options: "i" };
    }

    // Filter by actor (case-insensitive)
    if (actor) {
      query.cast = { $regex: actor, $options: "i" }; // Cast is an array
    }

    // Filter by ratings range
    if (ratingMin || ratingMax) {
      query.averageRating = {};
      if (ratingMin) query.averageRating.$gte = parseFloat(ratingMin);
      if (ratingMax) query.averageRating.$lte = parseFloat(ratingMax);
    }

    // Filter by popularity range (e.g., some metric or count)
    if (popularityMin || popularityMax) {
      query.popularity = {}; // Assume there's a `popularity` field in the Movie schema
      if (popularityMin) query.popularity.$gte = parseInt(popularityMin, 10);
      if (popularityMax) query.popularity.$lte = parseInt(popularityMax, 10);
    }

    // Filter by release year
    if (releaseYear) {
      query.releaseDate = {
        $gte: new Date(`${releaseYear}-01-01`),
        $lte: new Date(`${releaseYear}-12-31`),
      };
    }

    // Filter by decade
    if (decade) {
      const startYear = parseInt(decade, 10);
      const endYear = startYear + 9;
      query.releaseDate = {
        $gte: new Date(`${startYear}-01-01`),
        $lte: new Date(`${endYear}-12-31`),
      };
    }

    // Filter by country (assuming a `country` field in the Movie schema)
    if (country) {
      query.country = { $regex: country, $options: "i" };
    }

    // Filter by language (assuming a `language` field in the Movie schema)
    if (language) {
      query.language = { $regex: language, $options: "i" };
    }

    // Filter by keywords in synopsis or other text fields
    if (keywords) {
      query.$text = { $search: keywords }; // Ensure a text index exists on relevant fields
    }

    // Execute the query
    const movies = await Movie.find(query);

    if (!movies.length) {
      return res.status(404).json({ message: "No movies found with the given criteria." });
    }

    res.status(200).json({ movies });
  } catch (error) {
    console.error("Error searching and filtering movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { searchAndFilterMovies };
