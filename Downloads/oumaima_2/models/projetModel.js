const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
  organisation: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  
  }
});

const Projet = mongoose.model('Projet', projetSchema);

module.exports = Projet;

