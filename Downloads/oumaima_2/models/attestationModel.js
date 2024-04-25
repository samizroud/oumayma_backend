const mongoose = require('mongoose');

const attestationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  companyName: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  fileName: { type: String, required: true }
});

const Attestation = mongoose.model("Attestation", attestationSchema);

module.exports = Attestation;
