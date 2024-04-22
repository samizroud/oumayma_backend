const mongoose = require('mongoose');

const rapportSchema = new mongoose.Schema({
  filename: { type: String, required: true }, 
  originalname: { type: String, required: true }, 
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  uploadedAt: { type: Date, default: Date.now }
});

const Rapport = mongoose.model("Rapport", rapportSchema);

module.exports = Rapport;
