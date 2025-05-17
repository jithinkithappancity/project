 const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref:'Patient',
    required: true },

  doctorId: { 
    type: mongoose.Schema.Types.ObjectId,
     ref:'Doctor',
     required: true },
  dateOfAppointment: { type: Date, required: true },
 
}, { timestamps: true }); 

module.exports = mongoose.model('appointment', appointmentSchema);
