const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadReport, downloadReport } = require('../controllers/rapportController');

// Configuration de multer pour gérer le téléchargement de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}.pdf`);
  },
});
const upload = multer({ storage: storage });

// Route pour télécharger un rapport
router.post("/upload", upload.single('report'), uploadReport);

// Route pour télécharger un rapport
router.get("/reports/:reportId", downloadReport);

module.exports = router;


