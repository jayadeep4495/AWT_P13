import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const ResultSummary = ({ result }) => {
  const navigate = useNavigate();
  const { startQuiz, resetQuiz } = useQuiz();

  if (!result) return null;

  const {
    _id,
    unitNumber,
    unitName,
    totalQuestions = 15,
    correctAnswers = 0,
    incorrectAnswers = 0,
    unansweredQuestions = 0,
    marksObtained = 0,
    percentage = 0,
    passed = false,
    passingPercentage = 40,
  } = result;

  const handleRetake = async () => {
    const success = await startQuiz(unitNumber);
    if (success) {
      navigate(`/quiz/${unitNumber}`);
    }
  };

  const handleBackHome = () => {
    resetQuiz();
    navigate('/');
  };

  const handleReview = () => {
    navigate(`/review/${_id || 'current'}`);
  };

  return (
    <div className="result-summary-card">
      <div className="result-header">
        <div className="unit-info-tag">
          Unit {unitNumber}: {unitName}
        </div>
        <h1 className="result-title">Quiz Performance Summary</h1>
        <p className="result-subtitle">
          Here is your comprehensive evaluation for Unit {unitNumber}.
        </p>
      </div>

      <div className="score-hero">
        <div className={`score-circle ${passed ? 'passed' : 'failed'}`}>
          <div className="score-inner">
            <span className="score-number">{marksObtained}</span>
            <span className="score-max">/ {totalQuestions}</span>
            <span className="score-label">Marks</span>
          </div>
        </div>

        <div className="status-banner-container">
          <div className={`status-pill ${passed ? 'passed' : 'failed'}`}>
            <span className="status-icon">{passed ? '🎉' : '⚠️'}</span>
            <span className="status-text">{passed ? 'PASSED' : 'NEEDS IMPROVEMENT'}</span>
          </div>
          <div className="percentage-display">
            <span className="percentage-value">{percentage}%</span>
            <span className="percentage-criteria">
              (Passing criteria: {passingPercentage}% or higher)
            </span>
          </div>
        </div>
      </div>

      {/* Breakdown Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <span className="stat-label">Total Questions</span>
            <span className="stat-value">{totalQuestions}</span>
          </div>
        </div>

        <div className="stat-card stat-correct">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <span className="stat-label">Correct Answers</span>
            <span className="stat-value">{correctAnswers}</span>
          </div>
        </div>

        <div className="stat-card stat-incorrect">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <span className="stat-label">Incorrect Answers</span>
            <span className="stat-value">{incorrectAnswers}</span>
          </div>
        </div>

        <div className="stat-card stat-unanswered">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <span className="stat-label">Unanswered</span>
            <span className="stat-value">{unansweredQuestions}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="result-actions">
        <button
          onClick={handleReview}
          className="btn btn-primary btn-lg action-btn"
          id="review-answers-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>Review Answers & Explanations</span>
        </button>

        <button
          onClick={handleRetake}
          className="btn btn-outline btn-lg action-btn"
          id="retake-quiz-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          <span>Retake Quiz</span>
        </button>

        <button
          onClick={handleBackHome}
          className="btn btn-secondary btn-lg action-btn"
          id="back-home-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default ResultSummary;
