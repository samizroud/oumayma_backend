const Attestation = require('../models/attestationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Contrôleur pour créer une attestation et l'enregistrer dans la base de données
exports.createAttestation = catchAsync(async (req, res, next) => {
  try {
    const { studentName, companyName, startDate, endDate } = req.body;

    // Créer une nouvelle attestation et l'enregistrer dans la base de données
    const newAttestation = await Attestation.create({
      studentName,
      companyName,
      startDate,
      endDate
    });

    res.status(201).json({ message: 'Attestation générée avec succès', attestation: newAttestation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la création de l'attestation" });
  }
});

// Contrôleur pour récupérer une attestation par son ID et renvoyer le lien de téléchargement
exports.downloadAttestation = catchAsync(async (req, res, next) => {
  try {
    const attestation = await Attestation.findById(req.params.id);
    if (!attestation) {
      return res.status(404).json({ message: "Attestation non trouvée" });
    }

    // Dans cet exemple, nous supposons que le chemin du fichier PDF est stocké dans l'objet d'attestation
    const filePath = attestation.filePath;
    res.download(filePath); // Envoi du fichier PDF en tant que téléchargement
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du téléchargement de l'attestation" });
  }
});
