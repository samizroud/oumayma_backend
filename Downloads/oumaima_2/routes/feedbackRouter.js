const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authController = require('../controllers/authController');

router.post(
  "/",
  authController.protect, // Middleware d'authentification
  authController.restrictTo('admin', 'mentor'), // Middleware d'autorisation
  feedbackController.createFeedback
);

router.get(
  "/submissions/:submissionId",
  authController.protect,
  authController.restrictTo('admin', 'mentor'),
  feedbackController.getFeedbacksBySubmission
);

router.put(
  "/:feedbackId",
  authController.protect,
  authController.restrictTo('admin', 'mentor'),
  feedbackController.updateFeedback
);

router.delete(
  "/:feedbackId",
  authController.protect,
  authController.restrictTo('admin', 'mentor'),
  feedbackController.deleteFeedback
);

module.exports = router;
