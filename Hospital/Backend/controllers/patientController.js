 const Patient = require('../models/patient');

// Get all Patients
exports.getAllPatient = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// Add new patient
exports.addPatient= async (req, res) => {
  try {
    const newPatient= await Patient.create(req.body);
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update patient by ID
exports.updatePatient= async (req, res) => {
  try {
    const updatedPatient= await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Patient by ID
exports.deletePatient= async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
