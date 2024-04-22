const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");
const authController = require("../controllers/authController");
router.post(
  "/createAssignment",
  authController.protect,
  authController.restrictTo("admin"),
  assignmentController.createAssignment
);

router.get(
  "/getAssignment/:id",
  authController.protect,
  authController.restrictTo("admin"),
  assignmentController.getAssignmentById
);

router.get(
  "/getAllAssignments",
  authController.protect,
  authController.restrictTo("admin"),
  assignmentController.getAllAssignments
);

module.exports = router;
