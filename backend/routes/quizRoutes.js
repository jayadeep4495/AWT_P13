import express from 'express';
import { submitQuiz, getQuizResultById } from '../controllers/quizController.js';

const router = express.Router();

// POST /api/quiz/submit - Evaluate and save quiz answers
router.post('/submit', submitQuiz);

// GET /api/quiz/result/:id - Retrieve saved quiz result
router.get('/result/:id', getQuizResultById);

export default router;
