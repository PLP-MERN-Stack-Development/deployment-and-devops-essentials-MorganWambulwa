import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bugtracker';

mongoose
  .connect(MONGO_URI, { maxPoolSize: 10 })
  .then(() => {
    console.log('MongoDB connected');
    const server = app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );

    const shutdown = () => {
      console.log('Shutting down server...');
      server.close(() => {
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
