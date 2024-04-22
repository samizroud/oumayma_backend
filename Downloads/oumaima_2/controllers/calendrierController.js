const CalendarEntry = require('../models/calendrierModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Créer une nouvelle entrée dans le calendrier annuel
exports.createCalendarEntry = catchAsync(async (req, res, next) => {
  try {
    const { subject, interns, duration, startDate } = req.body;
    const newCalendarEntry = await CalendarEntry.create({
      subject,
      interns,
      duration,
      startDate,
    });
    res.status(201).json({
      status: 'success',
      data: {
        calendarEntry: newCalendarEntry,
      },
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la création de l\'entrée dans le calendrier', 500));
  }
});

// Récupérer toutes les entrées du calendrier annuel
exports.getAllCalendarEntries = catchAsync(async (req, res, next) => {
  try {
    const calendarEntries = await CalendarEntry.find();
    res.status(200).json({
      status: 'success',
      data: {
        calendarEntries,
      },
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la récupération des entrées du calendrier', 500));
  }
});

// Mettre à jour une entrée dans le calendrier annuel
exports.updateCalendarEntry = catchAsync(async (req, res, next) => {
  try {
    const updatedCalendarEntry = await CalendarEntry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedCalendarEntry) {
      return next(new AppError('Aucune entrée de calendrier trouvée avec cet ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        calendarEntry: updatedCalendarEntry,
      },
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la mise à jour de l\'entrée du calendrier', 500));
  }
});

// Supprimer une entrée dans le calendrier annuel
exports.deleteCalendarEntry = catchAsync(async (req, res, next) => {
  try {
    const deletedCalendarEntry = await CalendarEntry.findByIdAndDelete(req.params.id);
    if (!deletedCalendarEntry) {
      return next(new AppError('Aucune entrée de calendrier trouvée avec cet ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.error(error);
    next(new AppError('Erreur lors de la suppression de l\'entrée du calendrier', 500));
  }
});
