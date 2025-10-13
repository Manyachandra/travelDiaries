const jwt = require('jsonwebtoken');

// JWT secret - in production, use a strong secret from env
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No token provided.'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to request
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

// Middleware to check if user owns the resource
const verifyOwnership = (req, res, next) => {
  const userId = req.params.id || req.body.userId;
  
  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required.'
    });
  }

  if (req.user.id !== userId) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. You can only modify your own resources.'
    });
  }

  next();
};

// Generate JWT token
const generateToken = (userId, username) => {
  return jwt.sign(
    { id: userId, username: username },
    JWT_SECRET,
    { expiresIn: '7d' } // Token expires in 7 days
  );
};

module.exports = { verifyToken, verifyOwnership, generateToken, JWT_SECRET };

