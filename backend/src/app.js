const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

const bugRoutes = require('./routes/bugRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://bugtracker-frontend-non2j8imn-morgan-wambulwas-projects.vercel.app"
 ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(express.json());

app.use('/api/bugs', bugRoutes);

app.get('/health', (req, res) => res.send('OK'));

app.use(errorHandler);

module.exports = app;
