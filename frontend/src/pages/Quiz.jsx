import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { useQuiz } from '../context/QuizContext';

const Quiz = () => {
  const { unitNumber } = useParams();
  const navigate = useNavigate();

  const {
    currentUnit,
    questions,
    answers,
    currentQuestionIndex,
    loading,
    submitting,
    error,
    startQuiz,
    selectOption,
    nextQuestion,
    prevQuestion,
    goToQuestion,
    submitQuiz,
  } = useQuiz();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // If page is directly loaded or refreshed, load unit questions
  useEffect(() => {
    if (unitNumber && (!currentUnit || currentUnit.unitNumber !== parseInt(unitNumber, 10) || questions.length === 0)) {
      startQuiz(unitNumber);
    }
  }, [unitNumber]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-text">Loading 15 Unit {unitNumber} questions from MongoDB Atlas...</p>
        </div>
      </div>
    );
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="page-container">
        <div className="alert-banner alert-error">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4 className="alert-title">Unable to Load Quiz</h4>
            <p className="alert-message">{error || 'No questions found for this unit.'}</p>
            <div className="alert-actions">
              <button onClick={() => startQuiz(unitNumber)} className="btn btn-outline">
                Try Again
              </button>
              <button onClick={() => navigate('/')} className="btn btn-secondary">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).filter((id) => answers[id] !== null).length;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSubmitClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    try {
      setShowConfirmModal(false);
      const result = await submitQuiz();
      if (result && result._id) {
        navigate(`/result/${result._id}`);
      }
    } catch (err) {
      console.error('Quiz submission error:', err);
    }
  };

  return (
    <div className="page-container quiz-page">
      {/* Quiz Top Navigation Bar */}
      <div className="quiz-topbar">
        <div className="quiz-unit-info">
          <span className="quiz-pill">Unit {currentUnit?.unitNumber || unitNumber}</span>
          <h2 className="quiz-unit-heading">{currentUnit?.unitName || `Unit ${unitNumber}`}</h2>
        </div>

        <div className="quiz-answered-badge">
          <span className="badge-count">{answeredCount}</span> / {totalQuestions} Answered
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-section">
        <div className="progress-labels">
          <span className="progress-step">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="progress-percent">{progressPercentage}% Completed</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Main Quiz Body with Question Card and Navigation Palette */}
      <div className="quiz-layout">
        <div className="quiz-main">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              selectedOption={answers[currentQuestion._id] || null}
              onSelectOption={selectOption}
            />
          )}

          {/* Navigation and Submission Buttons */}
          <div className="quiz-controls">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0 || submitting}
              className="btn btn-outline"
              id="prev-question-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span>Previous</span>
            </button>

            <div className="quiz-controls-right">
              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={submitting}
                  className="btn btn-primary"
                  id="next-question-btn"
                >
                  <span>Next</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              ) : null}

              <button
                onClick={handleSubmitClick}
                disabled={submitting}
                className="btn btn-success submit-quiz-btn"
                id="submit-quiz-btn"
              >
                {submitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    <span>Submitting & Evaluating...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Quiz</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Question Palette Sidebar */}
        <aside className="quiz-sidebar">
          <div className="palette-card">
            <h3 className="palette-title">Question Navigator</h3>
            <p className="palette-subtitle">Click any number to jump directly to that question</p>

            <div className="palette-grid">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = !!answers[q._id];

                return (
                  <button
                    key={q._id}
                    onClick={() => goToQuestion(idx)}
                    className={`palette-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : 'unanswered'}`}
                    id={`palette-btn-${idx + 1}`}
                    title={`Question ${idx + 1} (${isAnswered ? 'Answered' : 'Not answered'})`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="palette-legend">
              <div className="legend-item">
                <span className="legend-dot dot-answered"></span>
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-unanswered"></span>
                <span>Unanswered ({unansweredCount})</span>
              </div>
              <div className="legend-item">
                <span className="legend-dot dot-current"></span>
                <span>Current</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation Modal Before Submission */}
      {showConfirmModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
          <div className="modal-card">
            <div className="modal-header">
              <div className="modal-icon">⚠️</div>
              <h3 className="modal-title" id="confirm-modal-title">Ready to Submit Quiz?</h3>
            </div>

            <div className="modal-body">
              <p>Please confirm your final submission for <strong>Unit {unitNumber}</strong>:</p>
              <div className="modal-stats">
                <div className="modal-stat-row">
                  <span>Total Questions:</span>
                  <strong>{totalQuestions}</strong>
                </div>
                <div className="modal-stat-row text-success">
                  <span>Questions Answered:</span>
                  <strong>{answeredCount}</strong>
                </div>
                <div className="modal-stat-row text-warning">
                  <span>Questions Unanswered:</span>
                  <strong>{unansweredCount}</strong>
                </div>
              </div>
              {unansweredCount > 0 && (
                <p className="modal-warning">
                  ⚠️ You have <strong>{unansweredCount}</strong> unanswered questions. Unanswered questions will receive 0 marks.
                </p>
              )}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn btn-outline"
                id="cancel-submit-btn"
                disabled={submitting}
              >
                Review More
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="btn btn-success"
                id="confirm-submit-btn"
                disabled={submitting}
              >
                {submitting ? 'Evaluating...' : 'Yes, Submit Final Answers'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
