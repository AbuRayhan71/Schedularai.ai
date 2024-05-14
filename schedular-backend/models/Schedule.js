const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  timeWindow: String,
  taskCategory: String,
  prompt: String,
  priority: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Schedule', scheduleSchema);
