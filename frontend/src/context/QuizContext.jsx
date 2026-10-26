import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchUnits as apiFetchUnits,
  fetchQuestionsByUnit as apiFetchQuestions,
  submitQuizAnswers as apiSubmitQuiz,
  fetchQuizResult as apiFetchResult,
} from '../services/api';

const QuizContext = createContext(null);

export const QuizProvider = ({ children }) => {
  const [units, setUnits] = useState([]);
  const [currentUnit, setCurrentUnit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { [questionId]: 'A' | 'B' | 'C' | 'D' }
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load units from backend
   */
  const loadUnits = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetchUnits();
      setUnits(data);
    } catch (err) {
      setError(
        err.message ||
          'Failed to connect to the backend server. Make sure the backend server is running on port 5000 and MongoDB is connected.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Automatically load units on initial mount
  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  /**
   * Start a quiz for a selected unit
   */
  const startQuiz = async (unitNumber) => {
    setLoading(true);
    setError(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizResult(null);

    try {
      const data = await apiFetchQuestions(unitNumber);
      setCurrentUnit({
        unitNumber: data.unitNumber,
        unitName: data.unitName,
      });
      setQuestions(data.questions || []);
      return true;
    } catch (err) {
      setError(
        err.message ||
          `Failed to load questions for Unit ${unitNumber}. Ensure the database is seeded using "npm run seed".`
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Select or change an option for a question
   */
  const selectOption = (questionId, optionLabel) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel,
    }));
  };

  /**
   * Navigation helpers for questions
   */
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  /**
   * Submit quiz answers to backend
   */
  const submitQuiz = async () => {
    if (submitting) return null; // Prevent duplicate submissions

    setSubmitting(true);
    setError(null);

    try {
      const formattedAnswers = questions.map((q) => ({
        questionId: q._id,
        selectedOption: answers[q._id] || null,
      }));

      const result = await apiSubmitQuiz(currentUnit.unitNumber, formattedAnswers);
      setQuizResult(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to submit quiz. Please try again.');
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  /**
   * Load an existing result by ID from the database
   */
  const loadResultById = async (resultId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFetchResult(resultId);
      setQuizResult(result);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to load quiz result.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Reset quiz state to retake or return home
   */
  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizResult(null);
    setError(null);
  };

  const value = {
    units,
    currentUnit,
    questions,
    answers,
    currentQuestionIndex,
    quizResult,
    loading,
    submitting,
    error,
    loadUnits,
    startQuiz,
    selectOption,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
    loadResultById,
    resetQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

export default QuizContext;
