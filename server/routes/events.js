const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Event=require('../Models/Events.js');
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
  const event = new Event({
    name: req.body.name,
    about: req.body.about,
    type: req.body.type
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
router.delete('/:id', async (req, res) => {
  try {
    const result = await Event.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;