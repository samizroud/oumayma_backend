const Attestation = require('../models/attestationModel');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Contrôleur pour créer une attestation et l'enregistrer dans la base de données
exports.createAttestation = catchAsync(async (req, res, next) => {
  try {
    const { studentName, companyName, startDate, endDate, fileName } = req.body;

    // Créer une nouvelle attestation et l'enregistrer dans la base de données
    const newAttestation = await Attestation.create({
      studentName,
      companyName,
      startDate,
      endDate,
      fileName
    });

    res.status(201).json({ message: 'Attestation générée avec succès', attestation: newAttestation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l'attestation" });
  }
});

exports.downloadAttestation = catchAsync(async (req, res, next) => {
  try {
    const attestation = await Attestation.findById(req.params.id);
    if (!attestation) {
      return res.status(404).json({ message: "Attestation non trouvée" });
    }

    // Supposons que le nom du fichier est stocké dans l'objet d'attestation sous la clé "fileName"
    const fileName = attestation.fileName;

    // Vérifier si le nom du fichier existe
    if (!fileName) {
      return res.status(404).json({ message: "Nom du fichier non trouvé dans l'attestation" });
    }

    // Construire le chemin complet du fichier à télécharger en utilisant path.join()
    const filePath = path.join(__dirname, "uploads", fileName);

    // Télécharger le fichier en tant que téléchargement
    res.download(filePath); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du téléchargement de l'attestation" });
  }
});