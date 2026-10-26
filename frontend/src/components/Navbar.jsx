import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const Navbar = () => {
  const { currentUnit, resetQuiz } = useQuiz();
  const location = useLocation();

  const isQuizActive = location.pathname.startsWith('/quiz');

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={resetQuiz}>
          <div className="brand-icon">🎓</div>
          <div className="brand-text">
            <span className="brand-title">MCQ Generator</span>
            <span className="brand-subtitle">MERN Stack Syllabus Exam Prep</span>
          </div>
        </Link>

        <div className="navbar-right">
          {isQuizActive && currentUnit && (
            <div className="quiz-unit-badge">
              <span className="badge-dot"></span>
              <span className="badge-text">
                Unit {currentUnit.unitNumber}: {currentUnit.unitName}
              </span>
            </div>
          )}

          <nav className="navbar-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={resetQuiz}
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
