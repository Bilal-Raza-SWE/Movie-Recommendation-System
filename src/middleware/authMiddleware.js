const jwt = require('jsonwebtoken');

//JWT middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization'); // Declare and get the header
  if (!authHeader) {
      return res.status(401).json({ message: 'Access Denied. No token provided' });
  }

  // Extract the token after "Bearer "
  const token = authHeader.split(' ')[1];
  // console.log(token);
  if (!token) {
      return res.status(401).json({ message: 'Access Denied. Token missing' });
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user information to the request object
      next();
  } catch (error) {
      console.error(`Error authenticating user: ${error.message}`);
      res.status(401).json({ message: 'Access Denied. Invalid token' });
  }
};

module.exports = authMiddleware;