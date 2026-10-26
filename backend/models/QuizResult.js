import mongoose from 'mongoose';

const evaluatedAnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    questionText: {
      type: String,
      required: true,
    },
    options: [
      {
        label: { type: String, required: true },
        text: { type: String, required: true },
        _id: false,
      },
    ],
    selectedOption: {
      type: String,
      default: null, // null if unanswered
    },
    correctAnswer: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    explanations: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true },
      _id: false,
    },
  },
  { _id: false }
);

const quizResultSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    unitName: {
      type: String,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
      default: 15,
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    incorrectAnswers: {
      type: Number,
      required: true,
      min: 0,
    },
    unansweredQuestions: {
      type: Number,
      required: true,
      min: 0,
    },
    marksObtained: {
      type: Number,
      required: true,
      min: 0,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    passingPercentage: {
      type: Number,
      default: 40,
    },
    submittedAnswers: [evaluatedAnswerSchema],
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly bind to 'quizresults' collection as required
const QuizResult = mongoose.model('QuizResult', quizResultSchema, 'quizresults');

export default QuizResult;
