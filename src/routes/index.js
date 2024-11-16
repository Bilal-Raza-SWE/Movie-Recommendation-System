const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const movieRoutes = require('./movieRoutes');

// Routes
router.use('/auth', authRoutes);

// User routes should only be accessed by authenticated users
router.use('/user', userRoutes);

// Movie routes should only be accessed by Admin
router.use('/movies', movieRoutes);

module.exports = router;