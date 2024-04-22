const profileController = require('../controllers/profileController');
const express = require('express');
const router = express.Router();


// Créer un nouveau profile
router.post("/createprofile", profileController.createProfil);

// Obtenir tous les profiles
router.get("/getallprofiles", profileController.getAllProfils);

// Obtenir un profile par son ID
router.get("/:id", profileController.getProfilById);

// Mettre à jour un profile
router.put("/updateprofile/:id", profileController.updateProfil);

// Supprimer un profile
router.delete("/deleteprofile/:id", profileController.deleteProfil);

module.exports = router;
