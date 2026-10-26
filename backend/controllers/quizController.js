import mongoose from 'mongoose';
import Question from '../models/Question.js';
import QuizResult from '../models/QuizResult.js';

/**
 * @desc    Submit quiz answers, evaluate on server, and save to 'quizresults'
 * @route   POST /api/quiz/submit
 * @access  Public
 */
export const submitQuiz = async (req, res, next) => {
  try {
    const { unitNumber, answers } = req.body;

    // Validate unitNumber
    const parsedUnit = parseInt(unitNumber, 10);
    if (isNaN(parsedUnit) || parsedUnit < 1 || parsedUnit > 5) {
      return res.status(400).json({
        success: false,
        message: 'Invalid unit number. Unit number must be an integer between 1 and 5.',
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Submitted answers must be provided as an array of { questionId, selectedOption }.',
      });
    }

    // Fetch all real questions for this unit from MongoDB with answers and explanations
    const questions = await Question.find({ unitNumber: parsedUnit }).sort({ _id: 1 });

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No questions found in database for Unit ${parsedUnit}. Please seed questions first.`,
      });
    }

    // Map student's submitted answers by questionId string
    const studentAnswerMap = new Map();
    answers.forEach((ans) => {
      if (ans && ans.questionId) {
        studentAnswerMap.set(ans.questionId.toString(), ans.selectedOption || null);
      }
    });

    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unansweredQuestions = 0;

    const evaluatedAnswers = questions.map((q) => {
      const qIdStr = q._id.toString();
      const selectedOption = studentAnswerMap.get(qIdStr) || null;

      let isCorrect = false;

      if (!selectedOption) {
        unansweredQuestions++;
      } else if (selectedOption.toUpperCase() === q.correctAnswer.toUpperCase()) {
        isCorrect = true;
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }

      return {
        questionId: q._id,
        questionText: q.questionText,
        options: q.options,
        selectedOption: selectedOption ? selectedOption.toUpperCase() : null,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanations: {
          A: q.explanations.A,
          B: q.explanations.B,
          C: q.explanations.C,
          D: q.explanations.D,
        },
      };
    });

    const totalQuestions = questions.length;
    const marksObtained = correctAnswers; // 1 mark per correct answer, 0 negative marks
    const percentage = parseFloat(((correctAnswers / totalQuestions) * 100).toFixed(2));
    const passingPercentage = 40; // Default passing criteria: 40%
    const passed = percentage >= passingPercentage;

    // Save evaluated result to 'quizresults' collection
    const quizResult = new QuizResult({
      unitNumber: parsedUnit,
      unitName: questions[0].unitName,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unansweredQuestions,
      marksObtained,
      percentage,
      passed,
      passingPercentage,
      submittedAnswers: evaluatedAnswers,
      submittedAt: new Date(),
    });

    const savedResult = await quizResult.save();

    res.status(201).json({
      success: true,
      message: 'Quiz submitted and evaluated successfully',
      data: savedResult,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Retrieve saved quiz result by ID
 * @route   GET /api/quiz/result/:id
 * @access  Public
 */
export const getQuizResultById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid quiz result ID format.',
      });
    }

    const result = await QuizResult.findById(id).lean();

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Quiz result not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
