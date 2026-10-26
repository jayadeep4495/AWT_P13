import React, { useEffect } from 'react';
import UnitCard from '../components/UnitCard';
import { useQuiz } from '../context/QuizContext';

const Home = () => {
  const { units, loading, error, loadUnits } = useQuiz();

  useEffect(() => {
    if (!units || units.length === 0) {
      loadUnits();
    }
  }, [units, loadUnits]);

  return (
    <div className="page-container home-page">
      {/* Hero Header Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span>🎯 Real MongoDB Atlas Cloud Database</span>
        </div>
        <h1 className="hero-title">
          College MERN Stack <span className="highlight-gradient">MCQ Generator</span>
        </h1>
        <p className="hero-description">
          Prepare for your college semester exams with our comprehensive syllabus-aligned
          question bank. Select any unit below to practice 15 curated questions, receive immediate
          server-side evaluation, and review in-depth explanations for every right and wrong option.
        </p>

        <div className="hero-features">
          <div className="feature-pill">
            <span className="pill-icon">📚</span>
            <span>5 Syllabus Units</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon">⚡</span>
            <span>75 Total Questions</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon">💡</span>
            <span>4-Way Option Explanations</span>
          </div>
          <div className="feature-pill">
            <span className="pill-icon">📊</span>
            <span>Real-time Scoring & Review</span>
          </div>
        </div>
      </section>

      {/* Backend / Network Error Banner */}
      {error && (
        <div className="alert-banner alert-error" role="alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h4 className="alert-title">Connection Notice</h4>
            <p className="alert-message">{error}</p>
            <div className="alert-actions">
              <button onClick={loadUnits} className="btn btn-sm btn-outline">
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && units.length === 0 && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="loading-text">Loading syllabus units from database...</p>
        </div>
      )}

      {/* Units Grid */}
      <section className="units-section">
        <div className="section-header">
          <h2 className="section-title">Select a Syllabus Unit to Begin</h2>
          <p className="section-subtitle">
            Each unit contains 15 unique MCQs covering theoretical foundations, syntax, and practical development concepts.
          </p>
        </div>

        <div className="units-grid">
          {units && units.length > 0 ? (
            units.map((unit) => <UnitCard key={unit.unitNumber} unit={unit} />)
          ) : (
            !loading && (
              <div className="empty-units-notice">
                <div className="empty-icon">📂</div>
                <h3>No Units Loaded</h3>
                <p>
                  Make sure your Express server is running on port 5000 and the MongoDB database is seeded.
                </p>
                <button onClick={loadUnits} className="btn btn-primary">
                  Refresh Units
                </button>
              </div>
            )
          )}
        </div>
      </section>

      {/* Exam Instructions Banner */}
      <section className="exam-guidelines-card">
        <h3 className="guidelines-title">📋 Exam & Marking Scheme Guidelines</h3>
        <ul className="guidelines-list">
          <li><strong>Unit Scope:</strong> Selecting a unit loads exactly 15 questions specific to that syllabus unit.</li>
          <li><strong>Marking Scheme:</strong> 1 mark per correct answer. 0 negative marking for wrong or unattempted answers. Maximum marks: 15.</li>
          <li><strong>Evaluation:</strong> Answers are strictly evaluated on the Express backend server for maximum academic integrity.</li>
          <li><strong>Explanations:</strong> Upon submission, review why the correct answer is right and why each incorrect option is wrong.</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
