const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/database'); // Ensure this path is correct
const routes = require('./src/routes');

dotenv.config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api', routes);

// Routes
app.get('/', (req, res) => {
  res.send('Movie Recommendation System Backend');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
