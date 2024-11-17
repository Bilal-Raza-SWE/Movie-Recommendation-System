const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  try {
      const { name, email, password, role } = req.body;

      // Ensure role is valid ('user' or 'admin')
      if (role && !['user', 'admin'].includes(role)) {
          return res.status(400).json({ message: 'Invalid role.' });
      }

      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: 'Email already in use.' });
      }

      // Create and save the user
      const user = new User({ name, email, password, role });
      await user.save();

      res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
      console.error("Error in registerUser:", error); // Log the error
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role }, // Include role in token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({message: 'token: ', token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { registerUser, loginUser };