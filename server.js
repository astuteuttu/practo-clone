const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const doctors = [
  {
    id: 1,
    name: 'Dr. Sheelavathi Natraj',
    specialty: 'Dermatologist',
    experience: 21,
    location: 'JP Nagar, Bangalore',
    consultationFee: 800,
    patientStories: 1506,
    photo: '/doctors/sheelavathi.jpg',
    availableToday: true,
    clinics: ['Sapphire Skin And Aesthetics Clinic', '+ 1 more'],
  },
  {
    id: 2,
    name: 'Aesthetic Heart Dermatology & Cardiology Clinic',
    specialty: 'Dermatologist',
    experience: 12,
    location: 'Jayanagar, Bangalore',
    consultationFee: 800,
    patientStories: 159,
    photo: '',   // no photo
    availableToday: false,
    clinics: [],
  }
];

app.get('/api/doctors', (req, res) => {
  const { location, specialty } = req.query;
  let results = doctors;

  if (location) {
    results = results.filter(doc =>
      doc.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (specialty) {
    results = results.filter(doc =>
      doc.specialty.toLowerCase().includes(specialty.toLowerCase())
    );
  }

  res.json(results);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend API running on port ${PORT}`));
