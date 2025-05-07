const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Check if the Authorization header is present
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extract the token from the header
  // authHeader is expected to be in the format "Bearer <token>"
  // So we split it and take the second part (the token itself)
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret key
    // If the token is valid, it will decode and return the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user ID from the token to the request object for later use
    // This allows us to access the user ID in subsequent middleware or route handlers
    req.user = { userId: decoded.userId };
    next(); // Continue to the route
  } catch (err) {
    console.error('Invalid token:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;

