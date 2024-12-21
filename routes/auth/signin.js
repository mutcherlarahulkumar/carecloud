const express = require('express');
const {User} = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express();

// Signin route
router.post('/', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found!' });
      }
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials!' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token, message: 'Signin successful!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  module.exports = router;