const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const mongodb= require('mongodb');
const Event=require('../../Models/Events.js');
const User=require('../../Models/Users.js');
// Get event
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  const userId = req.body.userId;  // Make sure userId is sent in the request body

  const event = new Event({
    name: req.body.name,
    about: req.body.about,
    type: req.body.type,
  });

  try {
    const newEvent = await event.save();

    // Add event ID to user's myEvents
    await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      { $push: { myEvents: newEvent._id } }
    );

    res.status(201).json({ message: 'Event created', event: newEvent });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;