import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import ReviewAnswers from './pages/ReviewAnswers';
import { QuizProvider } from './context/QuizContext';

function App() {
  return (
    <QuizProvider>
      <Router>
        <div className="app-layout">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz/:unitNumber" element={<Quiz />} />
              <Route path="/result/:id" element={<Result />} />
              <Route path="/result" element={<Result />} />
              <Route path="/review/:id" element={<ReviewAnswers />} />
              <Route path="/review" element={<ReviewAnswers />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <footer className="footer">
            <div className="footer-container">
              <div className="footer-left">
                <span className="footer-brand">MCQ Generator</span>
                <span className="footer-text">
                  Complete MERN Stack Syllabus Question Bank for College Engineering & Science Students.
                </span>
              </div>
              <div className="footer-right">
                <span className="footer-tech">React 18 • Express • Node.js • MongoDB Atlas</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;
