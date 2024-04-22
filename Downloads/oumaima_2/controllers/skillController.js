const Skill = require('../models/skillModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer une nouvelle compétence
exports.createSkill = catchAsync(async (req, res, next) => {
  try {
    const { name, level } = req.body;
    const newSkill = await Skill.create({
      name,
      level
    });

    res.status(201).json({
      status: 'success',
      data: {
        skill: newSkill
      }
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la création de la compétence', 500));
  }
});

// Obtenir toutes les compétences
exports.getAllSkills = catchAsync(async (req, res, next) => {
  try {
    const skills = await Skill.find();

    res.status(200).json({
      status: 'success',
      data: {
        skills
      }
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la récupération des compétences', 500));
  }
});

// Obtenir une compétence par son ID
exports.getSkillById = catchAsync(async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return next(new AppError('Aucune compétence trouvée avec cet ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        skill
      }
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la récupération de la compétence', 500));
  }
});

// Mettre à jour une compétence
exports.updateSkill = catchAsync(async (req, res, next) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedSkill) {
      return next(new AppError('Aucune compétence trouvée avec cet ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        skill: updatedSkill
      }
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la mise à jour de la compétence', 500));
  }
});

// Supprimer une compétence
exports.deleteSkill = catchAsync(async (req, res, next) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);

    if (!deletedSkill) {
      return next(new AppError('Aucune compétence trouvée avec cet ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la suppression de la compétence', 500));
  }
});
