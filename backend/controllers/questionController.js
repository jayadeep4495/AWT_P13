import Question from '../models/Question.js';

/**
 * @desc    Get 15 questions for a specific unit (WITHOUT correct answers or explanations)
 * @route   GET /api/questions/unit/:unitNumber
 * @access  Public
 */
export const getQuestionsByUnit = async (req, res, next) => {
  try {
    const unitNumber = parseInt(req.params.unitNumber, 10);

    // Validate unitNumber is between 1 and 5
    if (isNaN(unitNumber) || unitNumber < 1 || unitNumber > 5) {
      return res.status(400).json({
        success: false,
        message: 'Invalid unit number. Unit number must be an integer between 1 and 5.',
      });
    }

    // Fetch questions for this unit, strictly excluding correctAnswer and explanations
    const questions = await Question.find({ unitNumber })
      .select('_id unitNumber unitName questionText options difficulty')
      .sort({ _id: 1 })
      .lean();

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions found for Unit ${unitNumber}. Please ensure you have run the database seed script ('npm run seed' in the backend folder).`,
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      unitNumber,
      unitName: questions[0].unitName,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
};
