const educationController = require('../controllers/educationController');
const express = require('express');

const router = express.Router();


router.post("/create", educationController.createEducation);
router.get("/", educationController.getAllEducations);
router.get("/:id", educationController.getEducationById);
router.patch("/:id", educationController.updateEducation);
router.delete("/:id", educationController.deleteEducation);

module.exports = router;



