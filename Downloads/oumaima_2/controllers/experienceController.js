const Experience = require('../models/experienceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createExperience = catchAsync(async (req, res, next) => {
  const { company, job, startDate, endDate, description } = req.body;
  
  const newExperience = await Experience.create({
    company,
    job,
    startDate: new Date(startDate),
    endDate: endDate ? new Date(endDate) : null,
    description
  });

  res.status(201).json({
    status: 'success',
    data: {
      experience: newExperience
    }
  });
});


// Obtenir toutes les expériences
exports.getAllExperiences = catchAsync(async (req, res, next) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json({
      status: 'success',
      data: {
        experiences
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des expériences'
    });
  }
});

// Obtenir une expérience par son ID
exports.getExperienceById = catchAsync(async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune expérience trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        experience
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération de l\'expérience'
    });
  }
});

// Mettre à jour une expérience
exports.updateExperience = catchAsync(async (req, res, next) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedExperience) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune expérience trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        experience: updatedExperience
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour de l\'expérience'
    });
  }
});

// Supprimer une expérience
exports.deleteExperience = catchAsync(async (req, res, next) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune expérience trouvée avec cet ID'
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
      message: 'Erreur lors de la suppression de l\'expérience'
    });
  }
});
