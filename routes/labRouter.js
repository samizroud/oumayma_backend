const express = require('express');
const labController = require('../controllers/labController');
const authController = require('../controllers/authController');

const router = express.Router();

// Routes publiques
router.route('/')
  .get(labController.getAllLabs)
  .post(labController.createLab);

router.route('/:id')
  .get(labController.getLabById)
  .patch(labController.updateLab)
  .delete(labController.deleteLab);

// Routes protégées nécessitant une authentification
router.use(authController.protect);

// Routes pour la manipulation des utilisateurs dans un lab
router.route('/:labId/users/:userId')
  .post(labController.addUserToLab)
  .delete(labController.removeUserFromLab);

module.exports = router;

