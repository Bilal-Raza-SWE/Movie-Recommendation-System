const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const listRoutes = require('./src/routes/listRoutes');
const newsRoutes = require("./src/routes/newsRoutes");
const boxOfficeRoutes = require("./src/routes/boxOfficeRoutes");
const awardRoutes = require("./src/routes/awardRoutes");
const communityRoutes = require("./src/routes/communityRoutes");
const recommendationRoutes = require('./src/routes/recommendationRoutes');
const connectDB = require('./src/config/database');
const upcomingRoutes = require('./src/routes/upcomingRoutes');
const { searchAndFilterMovies } = require('./src/controllers/searchandfilterController');

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Middleware to parse JSON
app.use(bodyParser.json());

// Middleware to handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON received:", err.message);
    return res.status(400).json({ message: "Invalid JSON payload" });
  }
  next();
});

// Connect to MongoDB
connectDB();

//                                         ApI calls
// Authentication routes
app.use('/api/auth', authRoutes);

// User routes
app.use('/api/user', userRoutes);

// Movie routes
app.use('/api/movies', movieRoutes);

// Review routes
app.use('/api/reviews', reviewRoutes);

// List routes
app.use("/api/lists", listRoutes);

// Search and filter movies
app.use("/api/movies/search", searchAndFilterMovies);

// Recommendation routes
app.use("/api/recommendations", recommendationRoutes);

// Upcoming movies routes
app.use('/api/upcoming', upcomingRoutes);

// News routes
app.use("/api/news", newsRoutes);

// Box office routes
app.use("/api/boxOffice", boxOfficeRoutes);

// Award routes
app.use("/api/awards", awardRoutes);

// Community routes
app.use("/api/community", communityRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('Movie Recommendation System Backend');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
