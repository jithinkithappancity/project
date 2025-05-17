 const appointments = require('../models/appointment');

// Get all appointments

exports.getAllAppointments = async (req, res) => {
  try {
    const appointmentsdata = await appointments.find()
      .populate('patientId', 'name age gender')   // populate patient fields
      .populate('doctorId', 'name specialization'); // populate doctor fields
    res.json(appointmentsdata);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new appointments
exports.addappointments = async (req, res) => {
  try {
    const newAppointment = await appointments.create(req.body);
   
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update appointments by ID
exports.updateappointments = async (req, res) => {
  try {
    const updatedAppointment = await appointments.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete appointments by ID
exports.deleteappointments = async (req, res) => {
  try {
    const deletedAppointment = await appointments.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};