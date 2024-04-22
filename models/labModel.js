const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  backup: {
    type: Boolean,
    default: false
  },
  ram: {
    type: Number,
    required: true
  },
  disk: {
    type: Number,
    required: true
  },
  processor: {
    type: Number,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  goals: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Completed'],
    default: 'Active'
  },
  isAccepted: {
    type: Boolean,
    default: false
  },
  // Référence vers les Users
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Lab = mongoose.model('Lab', labSchema);

module.exports = Lab;

