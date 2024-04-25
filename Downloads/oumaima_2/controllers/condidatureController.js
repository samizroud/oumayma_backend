const Candidature = require('../models/condidatureModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer une nouvelle candidature
exports.createCandidature = catchAsync(async (req, res, next) => {
  const { stagiaireId, offreStageId } = req.body; // Récupérer également l'ID de l'offre de stage depuis le corps de la requête

  // Vérifier si l'utilisateur existe
  const stagiaire = await User.findById(stagiaireId);
  if (!stagiaire) {
    return next(new AppError("Stagiaire non trouvé.", 404));
  }

  // Créer la candidature avec l'ID de l'offre de stage
  const candidature = await Candidature.create({ stagiaire: stagiaireId, offreStage: offreStageId });

  res.status(201).json({ status: 'success', data: { candidature } });
});

// Accepter une candidature
exports.acceptCandidature = catchAsync(async (req, res, next) => {
  const { candidatureId } = req.params;

  // Mettre à jour le statut de la candidature
  const updatedCandidature = await Candidature.findByIdAndUpdate(
    candidatureId,
    { status: 'accepted', assistantNotified: false },
    { new: true }
  );

  if (!updatedCandidature) {
    return next(new AppError("Candidature non trouvée.", 404));
  }

  // Envoyer un e-mail à l'assistant
  try {
    const assistant = await User.findOne({ role: 'assistant' }); // Trouver l'assistant par son rôle
    if (!assistant) {
      return next(new AppError("Assistant non trouvé.", 404));
    }

    const message = `Bonjour ${assistant.fullName}, une nouvelle candidature a été acceptée. Veuillez contacter le stagiaire ${updatedCandidature.stagiaire.fullName} (${updatedCandidature.stagiaire.email}) pour organiser un entretien.`;
    await sendEmail(assistant.email, 'Candidature Acceptée', message);

    // Marquer l'assistant comme notifié
    updatedCandidature.assistantNotified = true;
    await updatedCandidature.save();

    res.status(200).json({ status: 'success', data: { candidature: updatedCandidature } });
  } catch (error) {
    console.error(error);
    return next(new AppError("Erreur lors de l'envoi de l'e-mail à l'assistant.", 500));
  }
});

// Refuser une candidature
exports.rejectCandidature = catchAsync(async (req, res, next) => {
  const { candidatureId } = req.params;

  // Mettre à jour le statut de la candidature
  const updatedCandidature = await Candidature.findByIdAndUpdate(
    candidatureId,
    { status: 'rejected' },
    { new: true }
  );

  if (!updatedCandidature) {
    return next(new AppError("Candidature non trouvée.", 404));
  }

  res.status(200).json({ status: 'success', data: { candidature: updatedCandidature } });
});

// Obtenir la liste de toutes les candidatures
exports.getAllCandidatures = catchAsync(async (req, res, next) => {
  const candidatures = await Candidature.find().populate('stagiaire', 'fullName email');
  res.status(200).json({ status: 'success', data: { candidatures } });
});

// Obtenir la liste des stagiaires acceptés
exports.getStagiairesAcceptes = catchAsync(async (req, res, next) => {
  const stagiairesAcceptes = await Candidature.find({ status: 'accepted' }).populate('stagiaire', 'fullName email');
  res.status(200).json({ status: 'success', data: { stagiairesAcceptes } });
});

// Historique des stagiaires acceptés
exports.getHistoriqueStagiairesAcceptes = catchAsync(async (req, res, next) => {
  const historiqueStagiairesAcceptes = await Candidature.find({ status: 'accepted' })
    .populate('stagiaire', 'fullName email')
    .select('stagiaire offreStage'); // Sélectionnez les champs que vous souhaitez inclure dans l'historique

  res.status(200).json({ status: 'success', data: { historiqueStagiairesAcceptes } });
});
