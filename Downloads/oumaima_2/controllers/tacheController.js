const Task = require('../models/tacheModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTask = catchAsync(async (req, res, next) => {
  // Ajouter l'offreStageId depuis le corps de la requête
  const { date, description, title, userId, offreStageId } = req.body;
  
  // Créer une nouvelle tâche avec les données fournies
  const newTask = await Task.create({ date, description, title, userId, offreStageId });

  res.status(201).json({
    status: 'success',
    data: {
      task: newTask
    }
  });
});

// Obtenir toutes les tâches
exports.getAllTasks = catchAsync(async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      status: 'success',
      data: {
        tasks
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des tâches'
    });
  }
});

// Obtenir une tâche par son ID
exports.getTaskById = catchAsync(async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune tâche trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération de la tâche'
    });
  }
});

// Mettre à jour une tâche
exports.updateTask = catchAsync(async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedTask) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune tâche trouvée avec cet ID'
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        task: updatedTask
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la mise à jour de la tâche'
    });
  }
});

// Supprimer une tâche
exports.deleteTask = catchAsync(async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({
        status: 'fail',
        message: 'Aucune tâche trouvée avec cet ID'
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
      message: 'Erreur lors de la suppression de la tâche'
    });
  }
});