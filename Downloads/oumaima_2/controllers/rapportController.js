const Rapport = require('../models/rapportModel');
const upload = require('../utils/upload');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Contrôleur pour télécharger un rapport
exports.uploadRapport = async (req, res) => {
  try {
    // Créer une nouvelle entrée de rapport dans la base de données
    const newRapport = new Rapport({
      filename: req.file.filename,
      originalname: req.file.originalname,
      uploader: req.user._id, // Vous devrez ajuster ceci selon votre système d'authentification
    });
    await newRapport.save();

    res.status(201).json({ message: 'Rapport téléchargé avec succès', rapport: newRapport });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du téléchargement du rapport" });
  }
};

// Contrôleur pour récupérer tous les rapports de l'utilisateur actuel
exports.getAllRapports = async (req, res) => {
  try {
    const rapports = await Rapport.find({ uploader: req.user._id }); // Vous devrez ajuster ceci selon votre système d'authentification
    res.status(200).json({ rapports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des rapports" });
  }
};

// Contrôleur pour supprimer un rapport
exports.deleteRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) {
      return res.status(404).json({ message: "Rapport non trouvé" });
    }

    await Rapport.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Rapport supprimé avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la suppression du rapport" });
  }
};
