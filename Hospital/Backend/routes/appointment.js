const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

// Get all appointments
router.get('/', appointmentController.getAllAppointments);

// Add a new appointments
router.post('/', appointmentController.addappointments);

// Update a appointments by ID
router.put('/:id', appointmentController.updateappointments);

// Delete a appointments by ID
router.delete('/:id', appointmentController.deleteappointments);

module.exports = router;
