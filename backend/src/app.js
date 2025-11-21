const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://bugtracker-frontend-1i6l9kyrg-morgan-wambulwas-projects.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use('/api/bugs', bugRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
