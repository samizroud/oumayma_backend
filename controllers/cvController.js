const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const CV = require('../models/cvModel'); 


// Créer un nouveau CV
exports.createCV = async (req, res, next) => {
  try {
    const newCV = await CV.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        cv: newCV
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'fail',
      message: 'Erreur lors de la création du CV'
    });
  }
};

// Obtenir tous les CVs
exports.getAllCVs = async (req, res, next) => {
  try {
    const cvs = await CV.find();
    res.status(200).json({
      status: 'success',
      data: {
        cvs
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des CVs'
    });
  }
};

// Obtenir un CV par son ID
exports.getCVById = async (req, res, next) => {
  try {
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun CV trouvé avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        cv
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération du CV'
    });
  }
};

// Mettre à jour un CV
exports.updateCV = async (req, res, next) => {
  try {
    const updatedCV = await CV.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedCV) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun CV trouvé avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        cv: updatedCV
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour du CV'
    });
  }
};

// Supprimer un CV
exports.deleteCV = async (req, res, next) => {
  try {
    const deletedCV = await CV.findByIdAndDelete(req.params.id);
    if (!deletedCV) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucun CV trouvé avec cet ID'
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
      message: 'Erreur lors de la suppression du CV'
    });
  }
};
