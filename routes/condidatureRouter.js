const express = require('express');
const router = express.Router();
const CandidatureController = require('../controllers/condidatureController');

// Créer une nouvelle candidature
router.post("/", CandidatureController.createCandidature);

// Accepter une candidature
router.put("/:candidatureId/accept", CandidatureController.acceptCandidature);

// Refuser une candidature
router.put("/:candidatureId/reject", CandidatureController.rejectCandidature);

// Obtenir la liste de toutes les candidatures
router.get("/", CandidatureController.getAllCandidatures);

// Obtenir la liste des stagiaires acceptés
router.get("/accepted", CandidatureController.getStagiairesAcceptes);

module.exports = router;

