import express from 'express';
import { getUnits } from '../controllers/unitController.js';

const router = express.Router();

// GET /api/units - Retrieve all 5 syllabus units
router.get('/', getUnits);

export default router;
