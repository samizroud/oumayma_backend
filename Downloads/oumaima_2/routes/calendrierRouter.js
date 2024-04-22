const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendrierController');

// Routes pour les opérations sur le calendrier annuel
router.post("/", calendarController.createCalendarEntry);
router.get("/", calendarController.getAllCalendarEntries);
router.put("/:id", calendarController.updateCalendarEntry);
router.delete('/:id', calendarController.deleteCalendarEntry);

module.exports = router;
