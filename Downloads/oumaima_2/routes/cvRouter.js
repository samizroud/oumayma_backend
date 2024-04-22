const cvController = require('../controllers/cvController');
const express = require('express');
const router = express.Router();


// Créer un nouveau CV
router.post("/", cvController.createCV);

// Obtenir tous les CV
router.get("/", cvController.getAllCVs);

// Obtenir un CV par son ID
router.get("/:id", cvController.getCVById);

// Mettre à jour un CV
router.put("/:id", cvController.updateCV);

// Supprimer un CV
router.delete("/:id", cvController.deleteCV);

module.exports = router;

