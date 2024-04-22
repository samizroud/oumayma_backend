const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  description: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offreStageId: { type: mongoose.Schema.Types.ObjectId, ref: 'OffreStage', required: true } 
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;


