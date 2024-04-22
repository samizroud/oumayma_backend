const mongoose = require('mongoose');


const cvSchema = new mongoose.Schema({
  education: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
  experience: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
  project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  skill: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
  certification: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certification' }]
});
cvSchema.statics.createCV = async function (cvData) {
  return this.create(cvData);
};

const CV = mongoose.model("CV", cvSchema);
module.exports = CV;
