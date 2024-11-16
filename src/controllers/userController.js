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
    const { name, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {name, preferences},
      {new: true}
    ).select('-password');

    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserProfile, updateUserProfile };