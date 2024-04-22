const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  deadline: {
    type: Date,
    required: true,
  },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;
