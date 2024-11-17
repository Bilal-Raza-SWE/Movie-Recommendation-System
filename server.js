const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require("body-parser");
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const movieRoutes = require('./src/routes/movieRoutes');

const connectDB = require('./src/config/database'); // Ensure this path is correct
const routes = require('./src/routes');

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

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/movies', movieRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Movie Recommendation System Backend');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
