const express = require('express');
const cors = require('cors');
const bugRoutes = require('./routes/bugRoutes');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

app.use(cors({
  origin: CLIENT_URL,
}));

app.use(express.json());

app.use('/api/bugs', bugRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
