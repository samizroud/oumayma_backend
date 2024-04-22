const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  intern: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mission",
    required: true,
  },
  documentUrl: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
