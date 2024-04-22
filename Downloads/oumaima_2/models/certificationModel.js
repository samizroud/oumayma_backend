const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Certification = mongoose.model("Certification", certificationSchema);

module.exports = Certification;
