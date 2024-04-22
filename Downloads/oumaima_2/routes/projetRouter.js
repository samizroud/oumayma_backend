const projetController = require('../controllers/projetController');
const express = require('express');
const router = express.Router();

// Créer un nouveau projet
router.post("/createprojet", projetController.createProjet);

// Obtenir tous les projets
router.get("/getallprojets", projetController.getAllProjets);

// Obtenir un projet par son ID
router.get("/:id", projetController.getProjetById);

// Mettre à jour un projet
router.put("/updateprojet/:id", projetController.updateProjet);

// Supprimer un projet
router.delete("/deleteprojet/:id", projetController.deleteProjet);

module.exports = router;



