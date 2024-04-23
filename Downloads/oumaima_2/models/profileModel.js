const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref:'User' },
  fullName: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'ASSISTANT', 'STAGIAIRE', 'ENCADRANT'], default: 'STAGIAIRE' },
  image: { type: String },
  nationality: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  department: { type: String },
  gender: { type: String, enum: ['MALE', 'FEMALE',] },
  isEnabled: { type: Boolean, default: true },
  cv: { type: mongoose.Schema.Types.ObjectId, ref: 'CV' },
  creationDate: { type: Date, default: Date.now() }
});

const Profil = mongoose.model("Profil", profilSchema);
module.exports = Profil;
