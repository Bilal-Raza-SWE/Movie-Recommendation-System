const Movie = require('../models/Movie');
const User = require('../models/User');
const Use = require('../models/User');
const nodemailer = require('nodemailer');

// Fetch upcoming movies
const getUpcomingMovies = async (req, res) => {
  try {
    const today = new Date();
    const upcomingMovies = await Movie.find({ releaseDate: { $gte: today } }).sort("releaseDate");

    if (!upcomingMovies.length) {
      return res.status(404).json({ message: "No upcoming movies found." });
    }

    res.status(200).json({ upcomingMovies });
  } 
  
  catch (error) {
    console.error("Error fetching upcoming movies:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Notify users about new releases in favorite genres
const notifyUsersAboutReleases = async (req, res) => {
  try {
    const today = new Date();
    const upcomingMovies = await Movie.find({ releaseDate: { $gte: today } });

    if (!upcomingMovies.length) {
      return res.status(404).json({ message: "No upcoming movies found to notify users about." });
    }

    const users = await User.find();

    const notifications = [];

    for (const user of users) {
      const { email, preferences } = user;

      const relevantMovies = upcomingMovies.filter((movie) =>
        preferences.some((genre) => movie.genre.includes(genre))
      );

      if (relevantMovies.length) {
        notifications.push({ email, movies: relevantMovies });
        // Send email notification
        await sendNotificationEmail(email, relevantMovies);
      }
    }

    res.status(200).json({
      message: "Notifications sent successfully.",
      notifications,
    });
  } catch (error) {
    console.error("Error notifying users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Utility function to send email notifications
const sendNotificationEmail = async (email, movies) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  const movieList = movies
    .map((movie) => `${movie.title} - Release Date: ${movie.releaseDate.toDateString()}`)
    .join("\n");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Upcoming Movies You Might Like!",
    text: `Hi there! Here are some upcoming movies in your favorite genres:\n\n${movieList}\n\nEnjoy!`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  getUpcomingMovies,
  notifyUsersAboutReleases,
};
