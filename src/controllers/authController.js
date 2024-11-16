const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

     // Ensure all fields are present
     if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
  }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  }

  catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token
    const token =jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1hr'});
    res.send({"message": "User logged in successfully", token});
  }
  
    catch (error) {
      console.error(`Error logging in user: ${error.message}`);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

module.exports = { registerUser, loginUser };