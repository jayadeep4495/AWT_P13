import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const ReviewAnswers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizResult, loadResultById, startQuiz, resetQuiz, loading } = useQuiz();
  const [result, setResult] = useState(quizResult);
  const [filter, setFilter] = useState('all'); // 'all' | 'correct' | 'incorrect' | 'unanswered'

  useEffect(() => {
    if (quizResult && (!id || quizResult._id === id || id === 'current')) {
      setResult(quizResult);
      return;
    }

    if (id && id !== 'current') {
      loadResultById(id)
        .then((data) => setResult(data))
        .catch((err) => console.error('Failed to load review result:', err));
    }
  }, [id, quizResult, loadResultById]);

  if (loading && !result) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-text">Loading question explanations from database...</p>
        </div>
      </div>
    );
  }

  if (!result || !result.submittedAnswers) {
    return (
      <div className="page-container">
        <div className="empty-units-notice">
          <div className="empty-icon">🔍</div>
          <h3>No Review Data Found</h3>
          <p>Please take a quiz to review question-by-question explanations.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const { unitNumber, unitName, marksObtained, totalQuestions, submittedAnswers } = result;

  // Filter items
  const filteredQuestions = submittedAnswers.filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'incorrect') return !item.isCorrect && item.selectedOption !== null;
    if (filter === 'unanswered') return item.selectedOption === null;
    return true;
  });

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

  return (
    <div className="page-container review-page">
      {/* Review Header */}
      <div className="review-header-card">
        <div className="review-header-top">
          <div>
            <div className="unit-info-tag">Unit {unitNumber}: {unitName}</div>
            <h1 className="review-title">Detailed Answer Review & Explanations</h1>
            <p className="review-subtitle">
              Score: <strong>{marksObtained} / {totalQuestions}</strong> ({result.percentage}%) • Understand exactly why each answer was right or wrong.
            </p>
          </div>

          <div className="review-header-actions">
            <button onClick={handleRetake} className="btn btn-outline" id="review-retake-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Retake Quiz</span>
            </button>
            <button onClick={handleBackHome} className="btn btn-secondary" id="review-home-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Back to Home</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="review-filter-bar">
          <span className="filter-label">Filter Questions:</span>
          <div className="filter-buttons">
            <button
              onClick={() => setFilter('all')}
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            >
              All ({submittedAnswers.length})
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`filter-btn btn-filter-correct ${filter === 'correct' ? 'active' : ''}`}
            >
              ✅ Correct ({result.correctAnswers})
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`filter-btn btn-filter-incorrect ${filter === 'incorrect' ? 'active' : ''}`}
            >
              ❌ Incorrect ({result.incorrectAnswers})
            </button>
            <button
              onClick={() => setFilter('unanswered')}
              className={`filter-btn btn-filter-unanswered ${filter === 'unanswered' ? 'active' : ''}`}
            >
              ⏳ Not Answered ({result.unansweredQuestions})
            </button>
          </div>
        </div>
      </div>

      {/* Questions Review List */}
      <div className="review-list">
        {filteredQuestions.map((item, index) => {
          const originalIndex = submittedAnswers.findIndex((q) => q.questionId === item.questionId);
          const qNumber = originalIndex !== -1 ? originalIndex + 1 : index + 1;

          let statusClass = 'status-incorrect';
          let statusText = 'Incorrect (0 Marks)';
          let statusIcon = '❌';

          if (item.isCorrect) {
            statusClass = 'status-correct';
            statusText = 'Correct (+1 Mark)';
            statusIcon = '✅';
          } else if (item.selectedOption === null) {
            statusClass = 'status-unanswered';
            statusText = 'Not Answered (0 Marks)';
            statusIcon = '⏳';
          }

          // Code formatting for question text
          const lines = item.questionText.split('\n');

          return (
            <article key={item.questionId || index} className={`review-card ${statusClass}`} id={`review-card-${qNumber}`}>
              {/* Question Card Header */}
              <div className="review-card-header">
                <div className="review-q-meta">
                  <span className="review-q-num">Question {qNumber} of {totalQuestions}</span>
                  <div className={`review-status-pill ${statusClass}`}>
                    <span>{statusIcon}</span>
                    <span>{statusText}</span>
                  </div>
                </div>

                <div className="review-student-choice">
                  <span className="choice-label">Your Answer:</span>
                  <span className={`choice-badge ${item.isCorrect ? 'choice-correct' : item.selectedOption ? 'choice-wrong' : 'choice-none'}`}>
                    {item.selectedOption ? `Option ${item.selectedOption}` : 'Not Answered'}
                  </span>
                  <span className="choice-divider">•</span>
                  <span className="choice-label">Correct Answer:</span>
                  <span className="choice-badge choice-correct">Option {item.correctAnswer}</span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="review-q-body">
                {lines.length === 1 ? (
                  <h3 className="review-q-text">{item.questionText}</h3>
                ) : (
                  <div>
                    <h3 className="review-q-text">{lines[0]}</h3>
                    <pre className="question-code-block">
                      <code>{lines.slice(1).join('\n')}</code>
                    </pre>
                  </div>
                )}
              </div>

              {/* 4 Options Grid */}
              <div className="review-options-grid">
                {item.options.map((opt) => {
                  const isCorrectAnswer = opt.label === item.correctAnswer;
                  const isStudentSelection = opt.label === item.selectedOption;

                  let optClass = 'opt-neutral';
                  if (isCorrectAnswer) {
                    optClass = 'opt-correct';
                  } else if (isStudentSelection && !isCorrectAnswer) {
                    optClass = 'opt-incorrect';
                  }

                  return (
                    <div key={opt.label} className={`review-option-card ${optClass}`}>
                      <div className="opt-left">
                        <span className="opt-letter">{opt.label}</span>
                        <span className="opt-text">{opt.text}</span>
                      </div>

                      <div className="opt-badges">
                        {isCorrectAnswer && (
                          <span className="badge-opt-correct">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Correct Answer
                          </span>
                        )}
                        {isStudentSelection && !isCorrectAnswer && (
                          <span className="badge-opt-wrong">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Your Selection
                          </span>
                        )}
                        {isStudentSelection && isCorrectAnswer && (
                          <span className="badge-opt-your-correct">
                            Your Selection
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Explanations Section */}
              <div className="review-explanation-container">
                <div className="explanation-main-header">
                  <div className="exp-icon">💡</div>
                  <h4>Option Analysis & Detailed Explanations</h4>
                </div>

                <div className="explanation-items">
                  {['A', 'B', 'C', 'D'].map((lbl) => {
                    const isCorrect = lbl === item.correctAnswer;
                    const isSelected = lbl === item.selectedOption;
                    const expText = item.explanations ? item.explanations[lbl] : 'No explanation provided.';

                    return (
                      <div
                        key={lbl}
                        className={`exp-box ${isCorrect ? 'exp-box-correct' : isSelected ? 'exp-box-selected-wrong' : 'exp-box-neutral'}`}
                      >
                        <div className="exp-box-header">
                          <span className={`exp-box-pill ${isCorrect ? 'pill-correct' : isSelected ? 'pill-wrong' : 'pill-neutral'}`}>
                            Option {lbl} {isCorrect ? '— Correct' : isSelected ? '— Your Wrong Selection' : '— Incorrect'}
                          </span>
                        </div>
                        <p className="exp-box-text">{expText}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Sticky Action Footer */}
      <div className="review-bottom-footer">
        <button onClick={handleRetake} className="btn btn-outline btn-lg">
          Retake Unit {unitNumber} Quiz
        </button>
        <button onClick={handleBackHome} className="btn btn-primary btn-lg">
          Back to All Units
        </button>
      </div>
    </div>
  );
};

export default ReviewAnswers;
