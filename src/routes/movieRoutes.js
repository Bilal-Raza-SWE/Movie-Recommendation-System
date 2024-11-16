const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {addMovie,updateMovie, deleteMovie, getMovieDetails, getMovieByPagination} = require('../controllers/movieController');

// Admin Routes
router.post('/add', authMiddleware, addMovie); // Add a new movie
router.put('/:movieId', authMiddleware, updateMovie); // Update a movie
router.delete('/:movieId', authMiddleware, deleteMovie); // Delete a movie
router.get('/:movieId', authMiddleware, getMovieDetails); // Get movie by id
router.get('/', authMiddleware, getMovieByPagination); // Get a new movie by pagination

// Export the router
module.exports = router;  