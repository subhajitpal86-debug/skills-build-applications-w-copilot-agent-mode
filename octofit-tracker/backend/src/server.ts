import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker API is running',
    baseUrl,
  });
});

app.use('/api', routes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, host, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Starting API without MongoDB connection');
    app.listen(port, host, () => {
      console.log(`Backend listening on port ${port}`);
      console.log(`API base URL: ${baseUrl}`);
    });
  });
