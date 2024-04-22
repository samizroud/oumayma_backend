const OffreStage = require("../models/OffrestageModel");
const Candidature = require("../models/condidatureModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Créer une nouvelle offre de stage
exports.createOffreStage = catchAsync(async (req, res, next) => {
  const nouvelleOffre = await OffreStage.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      offreStage: nouvelleOffre,
    },
  });
});

// Obtenir une offre de stage par ID
exports.getOffreStageById = catchAsync(async (req, res, next) => {
  const offreStage = await OffreStage.findById(req.params.id).populate('condidatures');
  if (!offreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      offreStage,
    },
  });
});

// Obtenir toutes les offres de stage
exports.getAllOffresStage = catchAsync(async (req, res, next) => {
  const offresStage = await OffreStage.find();
  res.status(200).json({
    status: "success",
    data: {
      offresStage,
    },
  });
});

// Mettre à jour une offre de stage
exports.updateOffreStage = catchAsync(async (req, res, next) => {
  const updatedOffreStage = await OffreStage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedOffreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      updatedOffreStage,
    },
  });
});

// Supprimer une offre de stage
exports.deleteOffreStage = catchAsync(async (req, res, next) => {
  const deletedOffreStage = await OffreStage.findByIdAndDelete(req.params.id);
  if (!deletedOffreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Obtenir les candidatures associées à une offre de stage
exports.getCandidaturesByOffreStageId = catchAsync(async (req, res, next) => {
  const offreStage = await OffreStage.findById(req.params.id).populate('candidatures');
  if (!offreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      candidatures: offreStage.candidatures,
    },
  });
});

// Ajouter une candidature à une offre de stage
exports.addCandidatureToOffreStage = catchAsync(async (req, res, next) => {
  const offreStage = await OffreStage.findById(req.params.id);
  if (!offreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }

  // Créer la candidature
  const nouvelleCandidature = await Candidature.create(req.body);

  // Mettre à jour l'offre de stage pour inclure la nouvelle candidature
  offreStage.candidatures.push(nouvelleCandidature._id);
  await offreStage.save();

  res.status(201).json({
    status: "success",
    data: {
      candidature: nouvelleCandidature,
    },
  });
});

// Supprimer une candidature d'une offre de stage
exports.removeCandidatureFromOffreStage = catchAsync(async (req, res, next) => {
  const offreStage = await OffreStage.findById(req.params.id);
  if (!offreStage) {
    return next(new AppError("Aucune offre de stage trouvée avec l'identifiant fourni", 404));
  }

  // Retirer l'ID de la candidature de la liste des candidatures de l'offre de stage
  offreStage.candidatures.pull(req.body.candidatureId);
  await offreStage.save();

  res.status(200).json({
    status: "success",
    message: "Candidature retirée de l'offre de stage avec succès",
  });
});
// Mettre à jour le statut d'une offre de stage
exports.updateOffreStageStatus = catchAsync(async (req, res, next) => {
  const { offreStageId, newStatus } = req.params;

  const offreStage = await OffreStage.findById(offreStageId);
  if (!offreStage) {
    return next(new AppError('Offre de stage non trouvée', 404));
  }

  offreStage.status = newStatus;
  await offreStage.save();

  res.status(200).json({
    status: 'success',
    data: {
      offreStage
    }
  });
});

// Obtenir les offres de stage par statut
exports.getOffresStageByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  const offresStage = await OffreStage.find({ status });
  res.status(200).json({
    status: 'success',
    data: {
      offresStage
    }
  });
});

