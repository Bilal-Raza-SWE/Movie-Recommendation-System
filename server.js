const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');
const listRoutes = require('./src/routes/listRoutes');
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

// ApI calls
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes)
app.use("/api/lists", listRoutes);
app.use("/api/movies/search", searchAndFilterMovies);
app.use("/api/recommendations", recommendationRoutes);
app.use('/api/upcoming', upcomingRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Movie Recommendation System Backend');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
