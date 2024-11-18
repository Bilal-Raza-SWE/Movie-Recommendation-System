const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// Get user profile
router.get('/getProfile', authMiddleware, getUserProfile);

// Update user profile
router.put('/updateProfile', authMiddleware, updateUserProfile);

module.exports = router;