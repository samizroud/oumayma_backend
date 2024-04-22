const express = require('express');
const router = express.Router();
const messagerieController = require('../controllers/messagerieController');
const authController = require('../controllers/authController');

// Middleware d'authentification
router.use(authController.protect);

// Routes pour la messagerie
router.post("/envoyer-message", messagerieController.envoyerMessage);
router.get("/messages/:destinataire", messagerieController.getMessages);
router.delete("/supprimer-message/:id", messagerieController.supprimerMessage);

module.exports = router;
