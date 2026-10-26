import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const UnitCard = ({ unit }) => {
  const navigate = useNavigate();
  const { startQuiz } = useQuiz();

  const handleStart = async () => {
    const success = await startQuiz(unit.unitNumber);
    if (success) {
      navigate(`/quiz/${unit.unitNumber}`);
    }
  };

  return (
    <div className="unit-card" id={`unit-card-${unit.unitNumber}`}>
      <div className="unit-card-header">
        <div className="unit-badge">
          <span className="unit-number-pill">Unit {unit.unitNumber}</span>
          <span className="unit-icon">{unit.icon || '📘'}</span>
        </div>
        <div className="unit-meta">
          <span className="meta-questions">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            {unit.questionCount || 15} Questions
          </span>
          <span className="meta-marks">15 Marks Max</span>
        </div>
      </div>

      <div className="unit-card-body">
        <h3 className="unit-title">{unit.unitName}</h3>
        <p className="unit-description">{unit.description}</p>

        {unit.topics && unit.topics.length > 0 && (
          <div className="unit-topics">
            <span className="topics-label">Key Topics:</span>
            <div className="topic-tags">
              {unit.topics.slice(0, 4).map((topic, idx) => (
                <span key={idx} className="topic-tag">
                  {topic}
                </span>
              ))}
              {unit.topics.length > 4 && (
                <span className="topic-tag topic-more">
                  +{unit.topics.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="unit-card-footer">
        <button
          className="btn btn-primary btn-block start-quiz-btn"
          id={`start-unit-${unit.unitNumber}`}
          onClick={handleStart}
        >
          <span>Start Unit {unit.unitNumber} Quiz</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UnitCard;
