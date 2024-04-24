const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
  stagiaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  assistantNotified: {
    type: Boolean,
    default: false,
  },
  offreStage: { // id de l'offre de stage
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OffreStage',
    required: false,
  },
});

const Candidature = mongoose.model("Candidature", candidatureSchema);

module.exports = Candidature;

