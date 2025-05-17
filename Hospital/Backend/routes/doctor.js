const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

// Get all doctors
router.get('/', doctorController.getAllDoctors);

router.get('/names',doctorController.getAllDoctornames);

// Add a new doctor
router.post('/', doctorController.addDoctor);

// Update a doctor by ID
router.put('/:id', doctorController.updateDoctor);

// Delete a doctor by ID
router.delete('/:id', doctorController.deleteDoctor);

module.exports = router;
