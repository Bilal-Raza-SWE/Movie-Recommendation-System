const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const {addMovie,getAllMovies, updateMovie, deleteMovie, getMovieDetails, getMovieByPagination} = require('../controllers/movieController');
// const {updateMovie} = require('../controller/movieController');}
// Admin Routes
router.post('/add', authMiddleware, adminMiddleware, addMovie); // Add a new movie
//get all movies
router.get('/getallmovies',authMiddleware, adminMiddleware, getAllMovies);
router.put('/update/:id', authMiddleware, adminMiddleware, updateMovie); // Update a movie
// router.put("/movies/:id", updateMovie); // Ensure parameter name is "id"

router.delete('/delete/:id',authMiddleware, adminMiddleware, deleteMovie); // Delete a movie
router.get('/getmovie/:id', authMiddleware, adminMiddleware, getMovieDetails); // Get movie by id
router.get('/page',authMiddleware, adminMiddleware,  getMovieByPagination); // Get a new movie by pagination

// Export the router
module.exports = router;  