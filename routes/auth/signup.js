const express = require('express');
const {User} = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Signup route
router.post('/', async (req, res) => {
  try {
    const {
      username,password,
      email,
      dob,accessList, gender,
      contactInfo, height,
      weight,
      bp,
      cholesterol,
      bloodSugar,
      sleepPatterns,substanceUse,
      exerciseRoutine, dietaryHabits,recordUpdates,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const newUser = new User({
      username,
      password,
      email,
      dob,
      accessList,
      gender,
      contactInfo,
      height,
      weight,
      bp,
      cholesterol,
      bloodSugar,
      sleepPatterns,
      substanceUse,
      exerciseRoutine,
      dietaryHabits,
      recordUpdates,
    });

    await newUser.save(); 
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;