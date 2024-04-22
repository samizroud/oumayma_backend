const certificationController = require('../controllers/certificationController');
const express = require('express');
const router = express.Router();


// Créer une nouvelle certification
router.post("/create", certificationController.createCertification);

// Obtenir toutes les certifications
router.get("/getAll", certificationController.getAllCertifications);

// Obtenir une certification par son ID
router.get("/:id", certificationController.getCertificationById);

// Mettre à jour une certification
router.put("/update/:id", certificationController.updateCertification);

// Supprimer une certification
router.delete("/delete/:id", certificationController.deleteCertification);

module.exports = router;
