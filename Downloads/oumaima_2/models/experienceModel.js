const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

// Ajoutez la méthode statique `createExperience` au schéma
experienceSchema.statics.createExperience = async function (experienceData) {
  return this.create(experienceData);
};

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;

