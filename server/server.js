import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import projectRoutes from './routes/projectRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all origins (Task B7)
app.use(cors());

// Body parser
app.use(express.json());

// Serve static project images from src/assets/images
app.use('/assets/images', express.static(path.join(__dirname, '../src/assets/images')));

// B1 Health Check Endpoint
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Centralized 404 Catch-All Handler
app.use(notFoundHandler);

// Global Error-Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
