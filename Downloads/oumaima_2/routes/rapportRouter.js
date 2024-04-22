const express = require('express');
const rapportController = require('../controllers/rapportController');
const upload = require('../utils/upload');
const router = express.Router();


router.post("/", upload.single('rapport'), rapportController.uploadRapport);
router.get("/", rapportController.getAllRapports);
router.delete("/:id", rapportController.deleteRapport);

module.exports = router;
