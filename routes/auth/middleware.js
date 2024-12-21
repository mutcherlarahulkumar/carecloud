// filepath: /c:/Users/mutch/OneDrive/Desktop/backend/middleware/auth.js
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_jwt_secret' with your actual secret
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = auth;