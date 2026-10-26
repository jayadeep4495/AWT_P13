import express from 'express';
import { getQuestionsByUnit } from '../controllers/questionController.js';

const router = express.Router();

// GET /api/questions/unit/:unitNumber - Retrieve 15 questions for selected unit
router.get('/unit/:unitNumber', getQuestionsByUnit);

export default router;
