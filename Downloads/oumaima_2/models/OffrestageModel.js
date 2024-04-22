const mongoose = require('mongoose');

const offreStageSchema = new mongoose.Schema({
  creationDate: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  encadrant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  candidatures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidature' }]
});

const OffreStage = mongoose.model("OffreStage", offreStageSchema);

module.exports = OffreStage;

