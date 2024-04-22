const Lab = require('../models/labModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer un nouveau lab
exports.createLab = catchAsync(async (req, res, next) => {
  const {
    department,
    code,
    backup,
    ram,
    disk,
    processor,
    start,
    end,
    goals,
    status,
    isAccepted
  } = req.body;

  const newLab = await Lab.create({
    department,
    code,
    backup,
    ram,
    disk,
    processor,
    start,
    end,
    goals,
    status,
    isAccepted,
    users: [] // Initialisez la liste des utilisateurs à vide pour le nouveau lab
  });

  res.status(201).json({
    status: 'success',
    data: {
      lab: newLab
    }
  });
});

// Obtenir tous les labs
exports.getAllLabs = catchAsync(async (req, res, next) => {
  const labs = await Lab.find();
  res.status(200).json({
    status: 'success',
    data: {
      labs
    }
  });
});

// Obtenir un lab par son ID
exports.getLabById = catchAsync(async (req, res, next) => {
  const lab = await Lab.findById(req.params.id).populate('users', 'fullName email');
  if (!lab) {
    return next(new AppError("Aucun lab trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      lab
    }
  });
});

// Mettre à jour un lab
exports.updateLab = catchAsync(async (req, res, next) => {
  const updatedLab = await Lab.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!updatedLab) {
    return next(new AppError("Aucun lab trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      lab: updatedLab
    }
  });
});

// Supprimer un lab
exports.deleteLab = catchAsync(async (req, res, next) => {
  const deletedLab = await Lab.findByIdAndDelete(req.params.id);
  if (!deletedLab) {
    return next(new AppError("Aucun lab trouvé avec l'identifiant fourni", 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Ajouter un utilisateur à un lab
exports.addUserToLab = catchAsync(async (req, res, next) => {
  const { labId, userId } = req.params;

  const lab = await Lab.findById(labId);
  if (!lab) {
    return next(new AppError("Aucun lab trouvé avec l'identifiant fourni", 404));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("Aucun utilisateur trouvé avec l'identifiant fourni", 404));
  }

  lab.users.push(user._id);
  await lab.save();

  res.status(200).json({
    status: 'success',
    data: {
      lab
    }
  });
});

// Supprimer un utilisateur d'un lab
exports.removeUserFromLab = catchAsync(async (req, res, next) => {
  const { labId, userId } = req.params;

  const lab = await Lab.findById(labId);
  if (!lab) {
    return next(new AppError("Aucun lab trouvé avec l'identifiant fourni", 404));
  }

  const userIndex = lab.users.indexOf(userId);
  if (userIndex === -1) {
    return next(new AppError("Cet utilisateur n'est pas associé à ce lab", 404));
  }

  lab.users.splice(userIndex, 1);
  await lab.save();

  res.status(200).json({
    status: 'success',
    data: {
      lab
    }
  });
});
