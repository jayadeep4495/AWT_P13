import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      enum: ['A', 'B', 'C', 'D'],
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const explanationsSchema = new mongoose.Schema(
  {
    A: { type: String, required: true },
    B: { type: String, required: true },
    C: { type: String, required: true },
    D: { type: String, required: true },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    unitNumber: {
      type: Number,
      required: [true, 'Unit number is required'],
      min: 1,
      max: 5,
      index: true,
    },
    unitName: {
      type: String,
      required: [true, 'Unit name is required'],
      trim: true,
    },
    questionText: {
      type: String,
      required: [true, 'Question text is required'],
      trim: true,
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: function (val) {
          return val && val.length === 4;
        },
        message: 'Each question must have exactly 4 options (A, B, C, D).',
      },
      required: true,
    },
    correctAnswer: {
      type: String,
      required: [true, 'Correct answer is required'],
      enum: ['A', 'B', 'C', 'D'],
    },
    explanations: {
      type: explanationsSchema,
      required: [true, 'Explanations for all options are required'],
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

// Explicitly bind to 'questions' collection as required
const Question = mongoose.model('Question', questionSchema, 'questions');

export default Question;
