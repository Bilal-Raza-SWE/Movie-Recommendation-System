const News = require("../models/NewsSchema");

// Fetch all news articles
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishDate: -1 }); // Latest first
    if (!news.length) {
      return res.status(404).json({ message: "No news articles found." });
    }
    res.status(200).json({ news });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a news article
const addNews = async (req, res) => {
  try {
    const { title, content, source, relatedMovies } = req.body;
    const newArticle = new News({ title, content, source, relatedMovies });
    await newArticle.save();
    res.status(201).json({ message: "News article added successfully.", newArticle });
  } catch (error) {
    console.error("Error adding news:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getNews,
  addNews,
};
