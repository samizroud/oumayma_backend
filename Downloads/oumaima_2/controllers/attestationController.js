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

exports.getAttestation = catchAsync(async (req, res, next) => {
  try {
    const attestation = await Attestation.findById(req.params.id);
    if (!attestation) {
      return res.status(404).json({ message: "Attestation non trouvée" });
    }

    const fileName = attestation.fileName;

    if (!fileName) {
      return res.status(404).json({ message: "Nom du fichier non trouvé dans l'attestation" });
    }

    const filePath = path.join(__dirname, "..", "..", "uploads", fileName);

    // Au lieu de télécharger le fichier, renvoyez un message et le chemin du fichier
    res.status(200).json({ message: "L'attestation est disponible pour téléchargement", filePath: filePath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de l'attestation" });
  }
});

