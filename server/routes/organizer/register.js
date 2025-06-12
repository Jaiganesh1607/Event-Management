const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../../Models/Users');

const router = express.Router();

// POST /users/register
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate presence
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

module.exports = router;
