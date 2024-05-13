const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
