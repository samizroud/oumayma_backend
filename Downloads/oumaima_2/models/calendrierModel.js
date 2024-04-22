const mongoose = require('mongoose');

const calendarEntrySchema = new mongoose.Schema({
  subject: { type: String, required: true },
  interns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  duration: { type: Number, required: true },
  progress: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
});

const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema);

module.exports = CalendarEntry;
