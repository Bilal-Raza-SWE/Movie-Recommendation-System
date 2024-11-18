const BoxOffice = require("../models/BoxOfficeSchema");

// Fetch box office data for a movie
const getBoxOfficeData = async (req, res) => {
  try {
    const { movieId } = req.params;
    const boxOffice = await BoxOffice.findOne({ movieId });
    if (!boxOffice) {
      return res.status(404).json({ message: "No box office data found for this movie." });
    }
    res.status(200).json({ boxOffice });
  } catch (error) {
    console.error("Error fetching box office data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add box office data
const addBoxOfficeData = async (req, res) => {
  try {
    const { movieId, totalEarnings, openingWeekend, currency } = req.body;
    const boxOfficeData = new BoxOffice({ movieId, totalEarnings, openingWeekend, currency });
    await boxOfficeData.save();
    res.status(201).json({ message: "Box office data added successfully.", boxOfficeData });
  } catch (error) {
    console.error("Error adding box office data:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getBoxOfficeData,
  addBoxOfficeData,
};
