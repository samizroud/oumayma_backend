const Profil = require("../models/profileModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// Créer un nouveau profil
exports.createProfil = catchAsync(async (req, res, next) => {
  const { fullName, phone, email, password, role, image, nationality, dateOfBirth, address, department, gender, isEnabled, cv } = req.body;
  const nouveauProfil = await Profil.create({
    fullName,
    phone,
    email,
    password,
    role,
    image, 
    nationality,
    dateOfBirth,
    address,
    department,
    gender,
    isEnabled,
    cv
  });

  res.status(201).json({
    status: "success",
    data: {
      profil: nouveauProfil,
    },
  });
});

// Obtenir tous les profils
exports.getAllProfils = catchAsync(async (req, res, next) => {
  const profils = await Profil.find();
  res.status(200).json({
    status: "success",
    data: {
      profils,
    },
  });
});

// Obtenir un profil par son ID
exports.getProfilById = catchAsync(async (req, res, next) => {
  const profil = await Profil.findById(req.params.id);
  if (!profil) {
    return next(new AppError("Aucun profil trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      profil,
    },
  });
});

// Mettre à jour un profil
exports.updateProfil = catchAsync(async (req, res, next) => {
  const updatedProfil = await Profil.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedProfil) {
    return next(new AppError("Aucun profil trouvé avec l'identifiant fourni", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      profil: updatedProfil,
    },
  });
});

// Supprimer un profil
exports.deleteProfil = catchAsync(async (req, res, next) => {
  const deletedProfil = await Profil.findByIdAndDelete(req.params.id);
  if (!deletedProfil) {
    return next(new AppError("Aucun profil trouvé avec l'identifiant fourni", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
