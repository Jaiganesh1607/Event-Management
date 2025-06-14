const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  type: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);