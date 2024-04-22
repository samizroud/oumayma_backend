const express = require('express');
const router = express.Router();
const offreStageController = require('../controllers/offrestageController');

// Créer une nouvelle offre de stage
router.post("/offres-stage", offreStageController.createOffreStage);

// Obtenir toutes les offres de stage
router.get("/offres-stage", offreStageController.getAllOffresStage);

// Obtenir une offre de stage par ID
router.get("/offres-stage/:id", offreStageController.getOffreStageById);

// Mettre à jour une offre de stage
router.put("/offres-stage/:id", offreStageController.updateOffreStage);

// Supprimer une offre de stage
router.delete("/offres-stage/:id", offreStageController.deleteOffreStage);

module.exports = router;
