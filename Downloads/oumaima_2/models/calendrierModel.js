const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  interns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  duration: { type: Number, required: true },
  progress:  { type: String, enum: ['', '', ''], default: '' }
});

const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema);

module.exports = CalendarEntry; 
