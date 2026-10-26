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
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

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
