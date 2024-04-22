const Certification = require('../models/certificationModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer une nouvelle certification
exports.createCertification = catchAsync(async (req, res, next) => {
  const { domain, date } = req.body;
  const newCertification = await Certification.create({ domain, date });

  res.status(201).json({
    status: 'success',
    data: {
      certification: newCertification
    }
  });
});

// Obtenir toutes les certifications
exports.getAllCertifications = catchAsync(async (req, res, next) => {
  try {
    const certifications = await Certification.find();
    res.status(200).json({
      status: 'success',
      data: {
        certifications
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des certifications'
    });
  }
});

// Obtenir une certification par son ID
exports.getCertificationById = catchAsync(async (req, res, next) => {
  try {
    const certification = await Certification.findById(req.params.id);
    if (!certification) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune certification trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        certification
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération de la certification'
    });
  }
});

// Mettre à jour une certification
exports.updateCertification = catchAsync(async (req, res, next) => {
  try {
    const { domain, date } = req.body;
    const updatedCertification = await Certification.findByIdAndUpdate(req.params.id, { domain, date }, {
      new: true,
      runValidators: true
    });
    if (!updatedCertification) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune certification trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        certification: updatedCertification
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour de la certification'
    });
  }
});

// Supprimer une certification
exports.deleteCertification = catchAsync(async (req, res, next) => {
  try {
    const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
    if (!deletedCertification) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune certification trouvée avec cet ID'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la suppression de la certification'
    });
  }
});
