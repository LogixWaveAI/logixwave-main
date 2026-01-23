const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check agar header me Bearer token hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token nikalo ("Bearer <token>" se)
      token = req.headers.authorization.split(' ')[1];

      // Token verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User dhundo (Password chod ke sab data le aao)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Sab sahi hai, aage badho
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };