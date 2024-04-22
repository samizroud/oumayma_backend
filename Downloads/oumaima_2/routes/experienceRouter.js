const experienceController = require('../controllers/experienceController');
const express = require('express');
const router = express.Router();


// Créer une nouvelle expérience
router.post("/create", experienceController.createExperience);

// Obtenir toutes les expériences
router.get("/all", experienceController.getAllExperiences);

// Obtenir une expérience par son ID
router.get("/:id", experienceController.getExperienceById);

// Mettre à jour une expérience
router.put("/update/:id", experienceController.updateExperience);

// Supprimer une expérience
router.delete("/delete/:id", experienceController.deleteExperience);

module.exports = router;
