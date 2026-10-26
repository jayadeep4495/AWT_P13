# 🎓 College MERN Stack MCQ Generator

A full-stack, production-ready Multiple Choice Question (MCQ) Generator web application designed for college students to prepare for semester exams in Full-Stack Web Development (MERN Stack).

The application allows students to choose from **5 syllabus units**, take a **15-question quiz** for each unit, submit their responses, receive **server-side evaluated scores** with percentage and pass/fail status, and study **in-depth explanations** for both why the correct answer is right and why every incorrect option is wrong.

---

## 📑 Table of Contents

1. [Project Overview & Key Features](#-project-overview--key-features)
2. [Technology Stack](#-technology-stack)
3. [Project Directory Structure](#-project-directory-structure)
4. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
5. [Step-by-Step MongoDB Atlas Setup Guide](#-step-by-step-mongodb-atlas-setup-guide-very-important)
6. [Environment Variables Configuration](#-environment-variables-configuration)
7. [Database Seeding (75 Syllabus Questions)](#-database-seeding-75-syllabus-questions)
8. [Installation and Running Instructions (Windows PowerShell)](#-installation-and-running-instructions-windows-powershell)
9. [API Documentation & Postman Testing](#-api-documentation--postman-testing)
10. [Troubleshooting & Common Connection Issues](#-troubleshooting--common-connection-issues)
11. [Syllabus Coverage Breakdown](#-syllabus-coverage-breakdown)

---

## 🌟 Project Overview & Key Features

- **5 Dedicated Units**: Exactly 15 unique MCQs per unit = **75 total MCQs**.
- **Server-Side Evaluation**: Questions are sent to the frontend *without* answers; evaluation occurs strictly on the Express backend to ensure academic integrity.
- **Detailed 4-Way Explanations**: Review mode shows why the correct option is right AND provides a separate reason why every other option is wrong.
- **Interactive Quiz Navigation**: Features a real-time question palette/navigator, previous/next controls, progress tracking, and confirmation modal before final submission.
- **MongoDB Atlas Integration**: Results and questions are stored in cloud database collections: `questions` and `quizresults` within the `mcq_generator` database.
- **Modern Responsive Design**: Built with sleek dark-mode glassmorphism, responsive grids, and micro-interactions.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Fast single-page application bundling |
| **Routing** | React Router v6 | Dynamic routing (`/`, `/quiz/:unitNumber`, `/result/:id`, `/review/:id`) |
| **State Management** | React Context API | Centralized `QuizContext` managing quiz lifecycle |
| **Styling** | Vanilla Modern CSS | Custom CSS variables, glassmorphism, flexbox/grid |
| **Backend** | Node.js + Express.js | Modular REST API with MVC pattern and ES Modules |
| **Database** | MongoDB Atlas | Fully managed cloud NoSQL database cluster |
| **ODM / Library** | Mongoose v8 | Schema validation and document modeling |
| **Environment** | dotenv | Secure runtime configuration management |

---

## 📂 Project Directory Structure

```text
AWT_P13/
│
├── frontend/                          # React + Vite Frontend Application
│   ├── public/                        # Static assets
│   ├── src/
│   │   ├── components/                # Modular Reusable UI Components
│   │   │   ├── Navbar.jsx             # Top navigation bar with active unit indicator
│   │   │   ├── UnitCard.jsx           # Syllabus unit card with "Start Quiz" button
│   │   │   ├── QuestionCard.jsx       # Single question display with options A, B, C, D
│   │   │   └── ResultSummary.jsx      # Marks, percentage, and performance statistics
│   │   ├── pages/                     # Application Page Views
│   │   │   ├── Home.jsx               # Home page listing the 5 units & exam guidelines
│   │   │   ├── Quiz.jsx               # 15-question quiz interface with question navigator
│   │   │   ├── Result.jsx             # Score summary and pass/fail status view
│   │   │   └── ReviewAnswers.jsx      # 15-question review with 4-way option explanations
│   │   ├── context/
│   │   │   └── QuizContext.jsx        # Context API managing quiz state & API actions
│   │   ├── services/
│   │   │   └── api.js                 # Centralized Fetch API client using VITE_API_URL
│   │   ├── App.jsx                    # Root component with BrowserRouter routes
│   │   ├── main.jsx                   # React DOM render entry point
│   │   └── index.css                  # Modern design system & responsive styling
│   ├── .env.example                   # Example frontend environment variables
│   ├── .env                           # Frontend environment file (VITE_API_URL)
│   ├── index.html                     # HTML5 template with Google Fonts (Inter, Outfit)
│   ├── package.json                   # Frontend dependencies and Vite scripts
│   └── vite.config.js                 # Vite bundler configuration
│
├── backend/                           # Node.js + Express.js REST API
│   ├── config/
│   │   └── db.js                      # Mongoose connection to MongoDB Atlas
│   ├── models/
│   │   ├── Question.js                # Schema bound to 'questions' collection
│   │   └── QuizResult.js              # Schema bound to 'quizresults' collection
│   ├── controllers/
│   │   ├── unitController.js          # Controller for GET /api/units
│   │   ├── questionController.js      # Controller for GET /api/questions/unit/:unitNumber
│   │   └── quizController.js          # Controller for POST /api/quiz/submit & GET results
│   ├── routes/
│   │   ├── unitRoutes.js              # Express router for units
│   │   ├── questionRoutes.js          # Express router for questions
│   │   └── quizRoutes.js              # Express router for quiz submission and review
│   ├── middleware/
│   │   └── errorMiddleware.js         # 404 handler and global JSON error middleware
│   ├── seed/
│   │   └── seedQuestions.js           # Seeds all 75 syllabus MCQs into MongoDB Atlas
│   ├── server.js                      # Express server entry point mounting routes & CORS
│   ├── .env.example                   # Example backend environment variables
│   ├── .env                           # Backend environment file (MONGODB_URI, PORT)
│   └── package.json                   # Backend dependencies (express, mongoose, cors, dotenv)
│
├── .gitignore                         # Prevents node_modules and .env from being committed
└── README.md                          # Complete setup and execution documentation
```

---

## 📋 Prerequisites & System Requirements

1. **Node.js**: Version **v18.0.0 or higher** (v20+ or v24+ recommended).
   - Check version: `node -v`
   - Download if not installed: [https://nodejs.org/](https://nodejs.org/)
2. **NPM**: Version **9.0.0 or higher**.
   - Check version: `npm -v`
3. **MongoDB Atlas Account**: Free cloud tier (M0 cluster).
4. **Web Browser**: Chrome, Edge, Firefox, or Brave.

---

## 🍃 Step-by-Step MongoDB Atlas Setup Guide (Very Important)

Follow these exact steps to obtain your free MongoDB Atlas database URL:

1. **Sign Up / Log In**:
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
   - Sign in with Google or create an account.
2. **Create a Project**:
   - Click **Projects** -> **New Project**.
   - Name it `College-MCQ-Generator` and click **Create Project**.
3. **Deploy a Free Cluster**:
   - Click **Build a Database**.
   - Choose the **M0 Free** tier.
   - Select your nearest Cloud Provider and Region (e.g., AWS - Mumbai/Frankfurt/N. Virginia).
   - Click **Create Cluster** (Cluster name can be left as `Cluster0`).
4. **Create a Database User**:
   - In the left sidebar, click **Database Access** under the "Security" header.
   - Click **Add New Database User**.
   - Choose **Password** authentication.
   - Enter a **Username** (e.g., `mcquser`) and a strong **Password** (e.g., `StudentPass2026`).
     > ⚠️ *Important*: Avoid special characters like `@`, `:`, `/`, or `?` in the password, or URL-encode them.
   - Under "Database User Privileges", ensure **Read and write to any database** is selected.
   - Click **Add User**.
5. **Configure Network Access (Allow IP)**:
   - In the left sidebar, click **Network Access**.
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) for local development so your machine can connect.
   - Click **Confirm** (wait ~1 minute for status to become "Active").
6. **Obtain Connection String**:
   - In the left sidebar, click **Database** (or **Clusters**).
   - Click the **Connect** button next to your cluster.
   - Select **Drivers**.
   - Under "Driver", choose **Node.js** (version 5.5 or later).
   - Copy the connection string displayed, which looks like:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
     ```
7. **Add the Database Name**:
   - Notice the connection string needs the database name `mcq_generator` before the query parameter `?`.
   - Update it to:
     ```text
     mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/mcq_generator?retryWrites=true&w=majority
     ```
8. **Paste into `backend/.env`**:
   - Open the file `backend/.env` in VS Code or your editor.
   - Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_CLUSTER` with your real Atlas details.

---

## 🔐 Environment Variables Configuration

### 1. Backend: `backend/.env`

Create or edit `backend/.env` directly inside the `backend` folder:

```env
PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mcq_generator?retryWrites=true&w=majority
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

> ⚠️ **Critical Rules**:
> - Never commit `backend/.env` to GitHub. It is already included in `.gitignore`.
> - Never put your MongoDB connection string in frontend code or in `frontend/.env`.

### 2. Frontend: `frontend/.env`

Create or edit `frontend/.env` directly inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

> 💡 **Note**: In Vite, environment variables must start with `VITE_`. Whenever you change `.env`, you must restart the frontend terminal.

---

## 📦 Database Seeding (75 Syllabus Questions)

Once you have configured `backend/.env` with your real MongoDB Atlas connection string, seed the database by running:

```powershell
cd backend
npm run seed
```

### What the Seed Script Does:
1. Connects securely to your MongoDB Atlas cluster.
2. Checks the `questions` collection in the `mcq_generator` database.
3. Clears any old data to prevent accidental duplicates.
4. Inserts all **75 syllabus questions** (15 for Unit 1, 15 for Unit 2, 15 for Unit 3, 15 for Unit 4, 15 for Unit 5).
5. Validates that every question has 4 options (A, B, C, D), a correct answer, and detailed explanations for every option.
6. Prints a confirmation report and disconnects.

---

## 🚀 Installation and Running Instructions (Windows PowerShell)

Open **two separate Windows PowerShell terminal windows**:

### Terminal 1: Backend Server

```powershell
# Navigate to the backend folder
cd backend

# Install all backend dependencies (Express, Mongoose, CORS, Dotenv)
npm install

# Seed the 75 syllabus MCQs into MongoDB Atlas
npm run seed

# Start the Express backend development server
npm run dev
```

*Expected output in Terminal 1:*
```text
🚀 Server running in development mode on port 5000
🔗 API Base URL: http://localhost:5000/api
✅ MongoDB Atlas Connected: cluster0-shard-00-00.mongodb.net
📁 Database Name: mcq_generator
```

---

### Terminal 2: Frontend Client

Open a second PowerShell terminal:

```powershell
# Navigate to the frontend folder
cd frontend

# Install all frontend dependencies (React, React Router, Vite)
npm install

# Start the Vite React development server
npm run dev
```

*Expected output in Terminal 2:*
```text
  VITE v6.4.5  ready in 450 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **`http://localhost:5173`** in your browser to start taking quizzes!

---

## 📡 API Documentation & Postman Testing

### Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/units` | Returns all 5 syllabus units with topics and metadata |
| `GET` | `/api/questions/unit/:unitNumber` | Returns 15 questions for a unit (without revealing answers) |
| `POST` | `/api/quiz/submit` | Evaluates answers on the server and saves the result in `quizresults` |
| `GET` | `/api/quiz/result/:id` | Retrieves a saved quiz result with full question-by-question review |

---

### Sample Postman Testing Request

#### 1. Submit Quiz (`POST http://localhost:5000/api/quiz/submit`)

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/quiz/submit`
- **Headers**:
  - `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "unitNumber": 1,
  "answers": [
    { "questionId": "671ba1234567890abcdef001", "selectedOption": "B" },
    { "questionId": "671ba1234567890abcdef002", "selectedOption": "B" },
    { "questionId": "671ba1234567890abcdef003", "selectedOption": "C" }
  ]
}
```

*Expected Server Response (`201 Created`):*
```json
{
  "success": true,
  "message": "Quiz submitted and evaluated successfully",
  "data": {
    "_id": "671ba9876543210fedcba999",
    "unitNumber": 1,
    "unitName": "JavaScript and TypeScript Essentials",
    "totalQuestions": 15,
    "correctAnswers": 3,
    "incorrectAnswers": 0,
    "unansweredQuestions": 12,
    "marksObtained": 3,
    "percentage": 20,
    "passed": false,
    "passingPercentage": 40,
    "submittedAt": "2026-10-26T09:40:00.000Z"
  }
}
```

#### 2. cURL Command

```bash
curl -X POST http://localhost:5000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -d '{"unitNumber":1,"answers":[{"questionId":"671ba1234567890abcdef001","selectedOption":"B"}]}'
```

---

## 🔧 Troubleshooting & Common Connection Issues

### 1. `querySrv ENOTFOUND _mongodb._tcp.YOUR_CLUSTER.mongodb.net`
- **Cause**: The `backend/.env` file still contains placeholder values (`YOUR_USERNAME`, `YOUR_PASSWORD`, `YOUR_CLUSTER`).
- **Fix**: Open `backend/.env` and replace them with your actual MongoDB Atlas cluster credentials.

### 2. `MongoServerError: bad auth : Authentication failed`
- **Cause**: Incorrect database username or password in `MONGODB_URI`.
- **Fix**: Verify your database user in MongoDB Atlas -> **Database Access**. If you forgot the password, click "Edit" on the user and set a new password, then update `backend/.env`.

### 3. `MongooseServerSelectionError: connection timed out`
- **Cause**: Your current IP address is not allowlisted in MongoDB Atlas Network Access.
- **Fix**: Go to MongoDB Atlas -> **Network Access** -> Click **Add IP Address** -> Select **Allow Access from Anywhere (0.0.0.0/0)** -> Click **Confirm**.

### 4. `Frontend shows: "Failed to connect to backend server"`
- **Cause**: Backend Express server is not running on port 5000, or `frontend/.env` is incorrect.
- **Fix**: Make sure Terminal 1 is running `npm run dev` in `backend`, and check that `frontend/.env` contains `VITE_API_URL=http://localhost:5000/api`.

### 5. `Port 5000 already in use`
- **Fix (PowerShell)**:
  ```powershell
  # Find the process ID using port 5000
  Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force
  ```

---

## 📚 Syllabus Coverage Breakdown

| Unit | Title | Questions | Topics Covered |
| :---: | :--- | :---: | :--- |
| **1** | **JavaScript & TypeScript Essentials** | 15 | Variables, scope, arrow functions, destructuring, template literals, ES modules, Promises, async/await, static typing, interfaces, classes, generics, tsconfig. |
| **2** | **ReactJS Frontend Development** | 15 | Components, props, state, useState, useEffect & cleanup, useContext, forms & controlled inputs, React Router v6, Axios vs Fetch, keys, lifting state up, useMemo. |
| **3** | **Backend Development with Node.js & Express** | 15 | Node.js event loop & libuv, package.json dependencies, REST principles, Express routing, params vs queries, middleware & next(), error middleware, MongoDB Atlas vs MySQL, Mongoose schemas/models, status codes, Postman. |
| **4** | **Web Application Security & Authentication** | 15 | Sessions vs tokens, JWT structure, httpOnly cookies, password hashing with bcrypt & salting, RBAC, CORS preflight, rate limiting, XSS defense, NoSQL injection, env variable security, Helmet. |
| **5** | **Modern Web Practices** | 15 | CSR vs SSR vs SSG, Next.js API routes, GraphQL queries/mutations vs REST, over/under-fetching, Socket.io WebSockets, Core Web Vitals (LCP, CLS, INP), code splitting, lazy loading, tree shaking, clean code (DRY). |

---

## 📝 License

This project is created for educational use for college computer science and engineering students. Feel free to customize and extend it!
