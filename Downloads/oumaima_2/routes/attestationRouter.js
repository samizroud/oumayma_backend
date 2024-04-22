const express = require('express');
const attestationController = require('../controllers/attestationController');

const router = express.Router();

// Point de terminaison pour créer une nouvelle attestation
router.post("/", attestationController.createAttestation);

// Point de terminaison pour télécharger une attestation par son ID
router.get("/:id/download", attestationController.downloadAttestation);

module.exports = router;
