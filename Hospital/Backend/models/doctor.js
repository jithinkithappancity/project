 const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
 
}, { timestamps: true }); 

module.exports = mongoose.model('Doctor', doctorSchema);
