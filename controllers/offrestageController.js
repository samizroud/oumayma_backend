const OffreStage = require("../models/OffrestageModel");
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
  const offreStage = await OffreStage.findById(req.params.id);
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
