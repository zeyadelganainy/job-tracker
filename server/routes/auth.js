//importing required modules
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      email,
      passwordHash
    });

    // Save to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // 1. Find the user
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
  
      // 2. Compare passwords
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
  
      // 3. Create JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      // 4. Send response
      res.status(200).json({
        message: 'Login successful',
        token,
        userId: user._id
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during login' });
    }
  });

module.exports = router;
