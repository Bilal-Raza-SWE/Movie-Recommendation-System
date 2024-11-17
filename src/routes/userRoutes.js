const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// Get user profile
router.get('/user/profile', authMiddleware, getUserProfile);

// Update user profile
router.put('/user/profile', authMiddleware, updateUserProfile);

module.exports = router;