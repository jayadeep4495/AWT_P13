import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import unitRoutes from './routes/unitRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const frontendUrl = process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.trim().replace(/\/$/, '')
        : null;
      const normalizedOrigin = origin.trim().replace(/\/$/, '');

      // Allow configured FRONTEND_URL, any Vercel domain (*.vercel.app), or localhost
      if (
        (frontendUrl && normalizedOrigin === frontendUrl) ||
        normalizedOrigin.endsWith('.vercel.app') ||
        normalizedOrigin.includes('localhost') ||
        normalizedOrigin.includes('127.0.0.1')
      ) {
        return callback(null, true);
      }

      // Allow other origins as well so requests are never blocked
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

// Redirect root to /api
app.get('/', (req, res) => {
  res.redirect('/api');
});

// API Base Route / Health Check
app.get('/api', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'MERN MCQ Generator API is operational',
    endpoints: {
      units: 'GET /api/units',
      questions: 'GET /api/questions/unit/:unitNumber',
      submit: 'POST /api/quiz/submit',
      result: 'GET /api/quiz/result/:id',
    },
  });
});

// Mount Routes
app.use('/api/units', unitRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/quiz', quizRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
});
