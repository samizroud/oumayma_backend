const express = require("express");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const authController = require("../controllers/authController");

// Middleware d'authentification pour protéger les routes
router.use(authController.protect);

// Routes pour les soumissions
router.post("/", submissionController.createSubmission);
router.get("/:id", submissionController.getSubmissionById);

module.exports = router;

