const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const mongodb= require('mongodb');
const Event=require('../../Models/Events.js');
const User=require('../../Models/Users.js');

//display myevents 
router.get('/:id', async(req,res) =>{
    const userId = new mongoose.Types.ObjectId(req.params.id);
    try{
        const user= await User.findById(userId);
        if(!user){
            return res.status(404).json({message : "User not found" });
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message : err.message});
    }
    
});


// DELETE an event
router.delete('/:id/:eventid', async (req, res) => {
  try {
    const eventId = new mongoose.Types.ObjectId(req.params.eventid);  // ✅ correct way
    const result = await Event.findByIdAndDelete(eventId);

    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Optional: Remove this event from user's myEvents array
    await User.updateOne(
      { myEvents: eventId },
      { $pull: { myEvents: eventId } }
    );

    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;