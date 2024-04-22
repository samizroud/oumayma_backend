const express = require('express');
const offreStageController = require('../controllers/offrestageController');

const router = express.Router();

router
  .route("/")
  .post(offreStageController.createOffreStage)
  .get(offreStageController.getAllOffresStage);

router
  .route("/:id")
  .get(offreStageController.getOffreStageById)
  .patch(offreStageController.updateOffreStage)
  .delete(offreStageController.deleteOffreStage);

router
  .route("/:id/candidatures")
  .get(offreStageController.getCandidaturesByOffreStageId)
  .post(offreStageController.addCandidatureToOffreStage);

router
  .route("/:id/candidatures/:candidatureId")
  .delete(offreStageController.removeCandidatureFromOffreStage);

router
.patch('/:offreStageId/updateStatus/:newStatus', offreStageController.updateOffreStageStatus)
.get('/status/:status', offreStageController.getOffresStageByStatus);


module.exports = router;

