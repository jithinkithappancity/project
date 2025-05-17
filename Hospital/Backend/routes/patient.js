 const express = require('express');
 const router = express.Router();
 const patientController = require('../controllers/patientController');
 
 // Get all patients
 router.get('/', patientController.getAllPatient);

 // Add a new patient
 router.post('/', patientController.addPatient);
 
 // Update a patient by ID
 router.put('/:id', patientController.updatePatient);
 
 // Delete a patient by ID
 router.delete('/:id', patientController.deletePatient);
 
 module.exports = router;
 