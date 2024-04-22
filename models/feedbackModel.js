const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true,
  },
  comments: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  evaluationCriteria: [String],
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
