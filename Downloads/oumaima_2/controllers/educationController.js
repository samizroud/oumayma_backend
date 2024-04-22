const Education = require('../models/educationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer une nouvelle éducation
exports.createEducation = catchAsync(async (req, res, next) => {
  const newEducation = new Education(req.body); // Créer une nouvelle instance de l'éducation avec les données de la requête

  await newEducation.save(); // Enregistrer l'éducation dans la base de données

  res.status(201).json({
    status: 'success',
    data: {
      education: newEducation
    }
  });
});

// Obtenir une éducation par ID
exports.getEducationById = catchAsync(async (req, res, next) => {
  const education = await Education.findById(req.params.id);
  if (!education) {
    return next(new AppError("Aucune éducation trouvée avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      education
    }
  });
});

// Obtenir toutes les éducations
exports.getAllEducations = catchAsync(async (req, res, next) => {
  const educations = await Education.find();
  res.status(200).json({
    status: 'success',
    data: {
      educations
    }
  });
});

// Mettre à jour une éducation
exports.updateEducation = catchAsync(async (req, res, next) => {
  const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updatedEducation) {
    return next(new AppError("Aucune éducation trouvée avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      education: updatedEducation
    }
  });
});

// Supprimer une éducation
exports.deleteEducation = catchAsync(async (req, res, next) => {
  const deletedEducation = await Education.findByIdAndDelete(req.params.id);
  if (!deletedEducation) {
    return next(new AppError("Aucune éducation trouvée avec l'identifiant fourni", 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
