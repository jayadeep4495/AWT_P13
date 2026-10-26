/**
 * API Service for MCQ Generator Application
 * Communicates with the Express backend using the environment-configured URL.
 */

// Read base URL from Vite environment variables (fallback to localhost:5000/api if unset)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to process Fetch response and parse errors cleanly
 */
const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.message ||
      `HTTP error ${response.status}: ${response.statusText || 'Request failed'}`;
    const error = new Error(errorMsg);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * Fetch the 5 syllabus units
 * @returns {Promise<Array>} List of units
 */
export const fetchUnits = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/units`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error('Error fetching units:', error);
    throw error;
  }
};

/**
 * Fetch 15 questions for a specific unit (without correct answers)
 * @param {number|string} unitNumber 
 * @returns {Promise<{ unitNumber, unitName, questions }>}
 */
export const fetchQuestionsByUnit = async (unitNumber) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/unit/${unitNumber}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return {
      unitNumber: result.unitNumber,
      unitName: result.unitName,
      questions: result.data,
    };
  } catch (error) {
    console.error(`Error fetching questions for unit ${unitNumber}:`, error);
    throw error;
  }
};

/**
 * Submit quiz answers to backend for evaluation and storage in MongoDB Atlas
 * @param {number|string} unitNumber
 * @param {Array<{ questionId: string, selectedOption: string|null }>} answers
 * @returns {Promise<Object>} Evaluated quiz result document
 */
export const submitQuizAnswers = async (unitNumber, answers) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ unitNumber, answers }),
    });
    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error('Error submitting quiz answers:', error);
    throw error;
  }
};

/**
 * Retrieve saved quiz result from MongoDB Atlas by result ID
 * @param {string} resultId
 * @returns {Promise<Object>} Quiz result document with review details
 */
export const fetchQuizResult = async (resultId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/quiz/result/${resultId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    const result = await handleResponse(response);
    return result.data;
  } catch (error) {
    console.error(`Error fetching quiz result ${resultId}:`, error);
    throw error;
  }
};

export default {
  fetchUnits,
  fetchQuestionsByUnit,
  submitQuizAnswers,
  fetchQuizResult,
};
