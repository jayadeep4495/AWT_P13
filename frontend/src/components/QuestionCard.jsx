import React from 'react';

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) return null;

  // Render question text with clean formatting for code lines if present
  const renderFormattedQuestion = (text) => {
    if (!text) return null;

    // Check if the question text contains newlines or code snippets
    const lines = text.split('\n');
    if (lines.length === 1) {
      return <h2 className="question-text">{text}</h2>;
    }

    return (
      <div className="question-multiline">
        <h2 className="question-text">{lines[0]}</h2>
        <pre className="question-code-block">
          <code>{lines.slice(1).join('\n')}</code>
        </pre>
      </div>
    );
  };

  return (
    <div className="question-card" id={`question-card-${questionNumber}`}>
      <div className="question-card-header">
        <div className="question-tag-group">
          <span className="question-number-badge">
            Question {questionNumber} of {totalQuestions}
          </span>
          {question.difficulty && (
            <span className={`difficulty-badge difficulty-${question.difficulty}`}>
              {question.difficulty.toUpperCase()}
            </span>
          )}
        </div>
        <div className="question-marks-badge">1 Mark</div>
      </div>

      <div className="question-body">
        {renderFormattedQuestion(question.questionText)}
      </div>

      <div className="options-container" role="radiogroup" aria-label="Question options">
        {question.options &&
          question.options.map((option) => {
            const isSelected = selectedOption === option.label;

            return (
              <label
                key={option.label}
                htmlFor={`q${questionNumber}-opt-${option.label}`}
                className={`option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectOption(question._id, option.label)}
              >
                <input
                  type="radio"
                  id={`q${questionNumber}-opt-${option.label}`}
                  name={`question-${question._id}`}
                  value={option.label}
                  checked={isSelected}
                  onChange={() => onSelectOption(question._id, option.label)}
                  className="option-radio-input"
                />
                <div className="option-label-circle">{option.label}</div>
                <div className="option-text">{option.text}</div>
                <div className="option-select-indicator">
                  <div className="indicator-dot"></div>
                </div>
              </label>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionCard;
