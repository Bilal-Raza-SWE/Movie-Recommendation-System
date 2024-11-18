const Award = require("../models/AwardSchema");

// Fetch awards for a movie
const getAwardsByMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const awards = await Award.find({ movieId });
    if (!awards.length) {
      return res.status(404).json({ message: "No awards found for this movie." });
    }
    res.status(200).json({ awards });
  } catch (error) {
    console.error("Error fetching awards:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add an award
const addAward = async (req, res) => {
  try {
    const { movieId, title, year, category, winner } = req.body;
    const newAward = new Award({ movieId, title, year, category, winner });
    await newAward.save();
    res.status(201).json({ message: "Award added successfully.", newAward });
  } catch (error) {
    console.error("Error adding award:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAwardsByMovie,
  addAward,
};
