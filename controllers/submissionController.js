const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Submission = require("../models/submissionModel");

exports.createSubmission = catchAsync(async (req, res, next) => {
  const newSubmission = await Submission.create(req.body);

  res.status(201).json({
    status: "success",

    submission: newSubmission,
  });
});

exports.getSubmissionById = catchAsync(async (req, res, next) => {
  const submission = await Submission.findById(req.params.id);
  if (!submission) {
    return next(new AppError("No submission found with the ID provided", 404));
  }
  res.status(200).json({
    status: "success",
    submission,
  });
});
