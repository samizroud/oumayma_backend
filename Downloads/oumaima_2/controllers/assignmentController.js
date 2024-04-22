const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Assignment = require("../models/assignmentModel");

exports.createAssignment = catchAsync(async (req, res, next) => {
  const newAssignment = await Assignment.create(req.body);

  res.status(201).json({
    status: "success",

    assignment: newAssignment,
  });
});

exports.getAssignmentById = catchAsync(async (req, res, next) => {
  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    return next(new AppError("No assignment found with the ID provided", 404));
  }
  res.status(200).json({
    status: "success",
    assignment,
  });
});

exports.getAllAssignments = catchAsync(async (req, res, next) => {
  const assignments = await Assignment.find();
  res.status(200).json({
    status: "success",
    assignments,
  });
});
