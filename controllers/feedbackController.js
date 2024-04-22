const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Feedback = require('../models/feedbackModel');

// Créer un nouveau feedback
exports.createFeedback = catchAsync(async (req, res, next) => {
  const { user, submission, comments, rating, evaluationCriteria } = req.body;

  const newFeedback = await Feedback.create({
    user,
    submission,
    comments,
    rating,
    evaluationCriteria,
  });

  res.status(201).json({
    status: 'success',
    feedback: newFeedback,
  });
});

// Lire les feedbacks pour une soumission donnée
exports.getFeedbacksBySubmission = catchAsync(async (req, res, next) => {
  const { submissionId } = req.params;

  const feedbacks = await Feedback.find({ submission: submissionId });

  res.status(200).json({
    status: 'success',
    feedbacks,
  });
});

// Mettre à jour un feedback existant
exports.updateFeedback = catchAsync(async (req, res, next) => {
  const { feedbackId } = req.params;
  const { comments, rating, evaluationCriteria } = req.body;

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    feedbackId,
    { comments, rating, evaluationCriteria },
    { new: true, runValidators: true }
  );

  if (!updatedFeedback) {
    return next(new AppError('No feedback found with the ID provided', 404));
  }

  res.status(200).json({
    status: 'success',
    feedback: updatedFeedback,
  });
});

// Supprimer un feedback
exports.deleteFeedback = catchAsync(async (req, res, next) => {
  const { feedbackId } = req.params;

  const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

  if (!deletedFeedback) {
    return next(new AppError('No feedback found with the ID provided', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
