// Syllabus Units Metadata Definition
const UNITS_DATA = [
  {
    unitNumber: 1,
    unitName: 'JavaScript and TypeScript Essentials',
    description:
      'Master core JavaScript fundamentals, ES6+ syntax, asynchronous programming with Promises & async/await, and TypeScript static typing, interfaces, and generics.',
    topics: [
      'Variables, functions, arrays & objects',
      'ES6+ features, arrow functions, destructuring',
      'Template literals & JavaScript modules',
      'Promises and async/await',
      'TypeScript static typing, interfaces & classes',
      'TypeScript generics & project setup',
    ],
    questionCount: 15,
    icon: '⚡',
  },
  {
    unitNumber: 2,
    unitName: 'ReactJS Frontend Development',
    description:
      'Build dynamic, state-driven interactive user interfaces using components, props, modern React Hooks, React Router, Context API, and REST API integration.',
    topics: [
      'React components & props',
      'State management basics',
      'useState, useEffect, and useContext',
      'Forms & form validation',
      'React Router navigation',
      'API integration with Fetch and Axios',
    ],
    questionCount: 15,
    icon: '⚛️',
  },
  {
    unitNumber: 3,
    unitName: 'Backend Development with Node.js and Express',
    description:
      'Develop scalable server-side applications and RESTful APIs using Node.js, Express routing, middleware, error handling, MongoDB Atlas connectivity, and Postman testing.',
    topics: [
      'Node.js architecture & NPM setup',
      'REST API design principles',
      'Express routing, middleware & handlers',
      'Request validation & status codes',
      'MongoDB Atlas & Mongoose connectivity',
      'Database CRUD operations & Postman testing',
    ],
    questionCount: 15,
    icon: '🟢',
  },
  {
    unitNumber: 4,
    unitName: 'Web Application Security and Authentication',
    description:
      'Implement industry-standard security architectures including JWT tokens, Role-Based Access Control (RBAC), bcrypt password hashing, CORS, rate limiting, and input sanitization.',
    topics: [
      'Session-based vs token-based authentication',
      'JWT creation, signing & verification',
      'Role-Based Access Control (RBAC)',
      'Password hashing using bcrypt',
      'CORS & rate limiting middleware',
      'Input sanitization & secure environment configs',
    ],
    questionCount: 15,
    icon: '🔒',
  },
  {
    unitNumber: 5,
    unitName: 'Modern Web Practices',
    description:
      'Explore cutting-edge web development strategies including SSR, SSG, GraphQL vs REST, real-time Socket.io communication, bundle optimization, and code splitting.',
    topics: [
      'Client-side routing vs SSR and SSG',
      'API routes and architecture',
      'GraphQL queries, mutations & schema',
      'GraphQL versus REST comparisons',
      'Socket.io real-time event communication',
      'Performance optimization & code splitting',
    ],
    questionCount: 15,
    icon: '🚀',
  },
];

/**
 * @desc    Get all 5 syllabus units
 * @route   GET /api/units
 * @access  Public
 */
export const getUnits = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      count: UNITS_DATA.length,
      data: UNITS_DATA,
    });
  } catch (error) {
    next(error);
  }
};
