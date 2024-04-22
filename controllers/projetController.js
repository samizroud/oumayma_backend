const Projet = require('../models/projetModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer un nouveau projet
exports.createProjet = catchAsync(async (req, res, next) => {
  const { organisation, title, description, date} = req.body;
  
  const newProjet = await Projet.create({
    organisation,
    title,
    description,
    date: date ? new Date(date) : Date.now()
  });

  res.status(201).json({
    status: 'success',
    data: {
      projet: newProjet
    }
  });
});

// Obtenir tous les projets
exports.getAllProjets = catchAsync(async (req, res, next) => {
  const projets = await Projet.find();
  res.status(200).json({
    status: 'success',
    data: {
      projets
    }
  });
});

// Obtenir un projet par son ID
exports.getProjetById = catchAsync(async (req, res, next) => {
  const projet = await Projet.findById(req.params.id);
  if (!projet) {
    return next(new AppError("Aucun projet trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      projet
    }
  });
});

// Mettre à jour un projet
exports.updateProjet = catchAsync(async (req, res, next) => {
  const updatedProjet = await Projet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updatedProjet) {
    return next(new AppError("Aucun projet trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      projet: updatedProjet
    }
  });
});

// Supprimer un projet
exports.deleteProjet = catchAsync(async (req, res, next) => {
  const deletedProjet = await Projet.findByIdAndDelete(req.params.id);
  if (!deletedProjet) {
    return next(new AppError("Aucun projet trouvé avec l'identifiant fourni", 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

