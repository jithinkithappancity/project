require('dotenv').config(); // <-- MUST be at the top!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Log it to verify
console.log('Mongo URI:', process.env.MONGO_URL);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));


// Routes
app.use('/api/doctors', require('./routes/doctor'));
app.use('/api/patients', require('./routes/patient'));
app.use('/api/appointments', require('./routes/appointment'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
