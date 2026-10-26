import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ResultSummary from '../components/ResultSummary';
import { useQuiz } from '../context/QuizContext';

const Result = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizResult, loadResultById, loading, error } = useQuiz();
  const [localResult, setLocalResult] = useState(quizResult);

  useEffect(() => {
    // If context already has the matching result, use it
    if (quizResult && (!id || quizResult._id === id)) {
      setLocalResult(quizResult);
      return;
    }

    // Otherwise, fetch from backend via id
    if (id) {
      loadResultById(id)
        .then((data) => setLocalResult(data))
        .catch((err) => console.error('Failed to load result:', err));
    }
  }, [id, quizResult, loadResultById]);

  if (loading && !localResult) {
    return (
      <div className="page-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-text">Loading quiz result from database...</p>
        </div>
      </div>
    );
  }

  if (error && !localResult) {
    return (
      <div className="page-container">
        <div className="alert-banner alert-error">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4 className="alert-title">Result Not Found</h4>
            <p className="alert-message">{error}</p>
            <div className="alert-actions">
              <button onClick={() => navigate('/')} className="btn btn-primary">
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!localResult) {
    return (
      <div className="page-container">
        <div className="empty-units-notice">
          <div className="empty-icon">📊</div>
          <h3>No Active Quiz Result</h3>
          <p>Please select a unit and complete a quiz to view your score.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container result-page">
      <ResultSummary result={localResult} />
    </div>
  );
};

export default Result;
