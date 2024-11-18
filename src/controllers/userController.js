const User = require('../models/User');

//                            Profile Management
//get user data
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json(user);
  }

  catch (err) {
    console.error(`Error getting user profile: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//update user data
const updateUserProfile = async (req, res) => {
  try {
    // console.log('Request body:', req.body);
    const { name, preferences } = req.body;

    console.log('Updating user profile for user ID:', req.user.userId);
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name, preferences },
      { new: true }
    ).select('-password');

    // console.log('Updated user profile:', user);
    res.status(200).json(user);
    
  } catch (error) {
    console.error(`Error updating user profile: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };