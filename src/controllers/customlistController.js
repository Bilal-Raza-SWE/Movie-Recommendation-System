const CustomList = require("../models/CustomListSchema");
const Movie = require("../models/Movie"); // Import the Movie model

// Create or update a custom list
const addOrUpdateList = async (req, res) => {
  try {
    const { userId, title, movies, isPublic } = req.body;

    // Check for missing required fields
    if (!userId || !title) {
      return res.status(400).json({ message: "userId and title are required" });
    }

    // Validate movies: Check if they exist in the database
    if (movies && movies.length > 0) {
      const existingMovies = await Movie.find({ id: { $in: movies } });

      if (existingMovies.length !== movies.length) {
        // Some movies are invalid
        const existingMovieIds = existingMovies.map((movie) => movie.id);
        const invalidMovies = movies.filter((id) => !existingMovieIds.includes(id));

        return res.status(400).json({
          message: "Some movies do not exist in the database",
          invalidMovies,
        });
      }
    }

    // Find if a list with the same userId and title exists
    let customList = await CustomList.findOne({ userId, title });

    if (customList) {
      // Update the existing list
      customList.movies = movies || customList.movies;
      customList.isPublic = isPublic !== undefined ? isPublic : customList.isPublic;
      customList.updatedAt = Date.now();
      await customList.save();
    } else {
      // Create a new list
      customList = new CustomList({ userId, title, movies, isPublic });
      await customList.save();
    }

    res.status(200).json({
      message: "Custom list saved successfully",
      customList,
    });
  } catch (error) {
    console.error("Error saving custom list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch user's custom lists
const getUserLists = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const customLists = await CustomList.find({ userId });

    if (!customLists.length) {
      return res.status(200).json({ message: "No custom lists found for this user" });
    }

    // Populate movie details for each list
    const detailedLists = await Promise.all(
      customLists.map(async (list) => {
        const movies = await Movie.find({ id: { $in: list.movies } });
        return { ...list._doc, movieDetails: movies };
      })
    );

    res.status(200).json({ customLists: detailedLists });
  } catch (error) {
    console.error("Error fetching user lists:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Fetch public lists
const getPublicLists = async (req, res) => {
  try {
    const publicLists = await CustomList.find({ isPublic: true });

    if (!publicLists.length) {
      return res.status(404).json({ message: "No public lists found" });
    }

    // Populate movie details for each public list
    const detailedLists = await Promise.all(
      publicLists.map(async (list) => {
        const movies = await Movie.find({ id: { $in: list.movies } });
        return { ...list._doc, movieDetails: movies };
      })
    );

    res.status(200).json({ publicLists: detailedLists });
  } catch (error) {
    console.error("Error fetching public lists:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Delete a custom list
const deleteList = async (req, res) => {
  try {
    const { listId, userId } = req.params;

    if (!listId || !userId) {
      return res.status(400).json({ message: "listId and userId are required" });
    }

    const customList = await CustomList.findOneAndDelete({ listId, userId });

    if (!customList) {
      return res.status(404).json({ message: "Custom list not found" });
    }

    res.status(200).json({ message: "Custom list deleted successfully" });
  } catch (error) {
    console.error("Error deleting custom list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Share or follow a public list
const shareOrFollowList = async (req, res) => {
  try {
    const { listId } = req.params;

    if (!listId) {
      return res.status(400).json({ message: "listId is required" });
    }

    const customList = await CustomList.findOne({ listId, isPublic: true });

    if (!customList) {
      return res.status(404).json({ message: "Public list not found" });
    }

    // Fetch detailed movie information
    const movies = await Movie.find({ id: { $in: customList.movies } });

    res.status(200).json({
      message: `Successfully fetched public list: ${customList.title}`,
      customList: { ...customList._doc, movieDetails: movies },
    });
  } catch (error) {
    console.error("Error sharing or following list:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  addOrUpdateList,
  getUserLists,
  getPublicLists,
  deleteList,
  shareOrFollowList,
};
