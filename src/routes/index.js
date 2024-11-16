const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

// Routes
router.use('/auth', authRoutes);

// User routes should only be accessed by authenticated users
router.use('/user', userRoutes);

module.exports = router;