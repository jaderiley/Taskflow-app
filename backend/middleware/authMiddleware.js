import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('🛡️ Received token:', token); // Log the token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Decoded token:', decoded); // Log the decoded result

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      console.log('👤 User found:', req.user); // Log the user

      next();
    } catch (error) {
      console.error('❌ JWT verification failed:', error.message); // Log error message
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.warn('⚠️ No token found in headers');
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
