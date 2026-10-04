# 🏋️ FitTrack — Personal Fitness Daily Habit Tracker

A complete full-stack fitness tracking application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **Authentication** — JWT-based register/login with password hashing (bcrypt)
- **Dashboard** — Real-time overview of habits, water, steps, sleep with weekly charts
- **Habit Tracking** — Add, edit, delete, toggle daily habits with streak counting
- **Daily Logging** — Track water intake, sleep hours, steps, workouts, meals, meditation
- **Fitness Goals** — Set goals with progress tracking, milestones, and deadlines
- **Calendar View** — Monthly calendar with habit completion history
- **Statistics** — Charts for water, sleep, steps trends (Recharts)
- **Profile & Settings** — Edit profile, change password, preferences
- **Responsive UI** — Modern Tailwind CSS design, works on mobile and desktop

## 🛠 Tech Stack

| Layer          | Technology                        |
|----------------|-----------------------------------|
| Frontend       | React 18 + Vite + Tailwind CSS 4  |
| Backend        | Node.js + Express.js              |
| Database       | MongoDB + Mongoose                |
| Auth           | JWT + bcrypt                      |
| Charts         | Recharts                          |
| Icons          | Lucide React                      |
| Notifications  | React Hot Toast                   |
| Date Handling  | date-fns                          |

## 📁 Project Structure

```
personal fitness ms/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── api/             # Axios instance
│   │   ├── components/
│   │   │   ├── common/      # Modal, StatCard, ProgressBar, etc.
│   │   │   └── layout/      # Sidebar, Layout
│   │   ├── context/         # AuthContext
│   │   ├── hooks/           # useApi custom hook
│   │   ├── pages/           # All page components
│   │   ├── App.jsx          # Routes & providers
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind + custom styles
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Express Backend
│   ├── config/              # MongoDB connection
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth, error handling, validation
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API route definitions
│   ├── utils/               # Helper functions
│   ├── server.js            # Entry point
│   ├── .env                 # Environment variables
│   └── package.json
│
└── package.json             # Root scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ 
- **MongoDB** running locally on port 27017 (or update `.env`)

### Installation

```bash
# Install all dependencies
cd server && npm install
cd ../client && npm install
```

### Running the Application

**Terminal 1 — Start the backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Start the frontend:**
```bash
cd client
npm run dev
```

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000

### Environment Variables

Edit `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fitness-tracker
JWT_SECRET=fitness_tracker_jwt_secret_key_2024
JWT_EXPIRE=30d
NODE_ENV=development
```

## 📡 API Endpoints

### Auth
| Method | Endpoint             | Description        |
|--------|----------------------|--------------------|
| POST   | `/api/auth/register` | Register new user  |
| POST   | `/api/auth/login`    | Login user         |
| GET    | `/api/auth/me`       | Get current user   |

### Habits
| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | `/api/habits`             | Get all habits       |
| POST   | `/api/habits`             | Create habit         |
| PUT    | `/api/habits/:id`         | Update habit         |
| DELETE | `/api/habits/:id`         | Delete habit         |
| PUT    | `/api/habits/:id/toggle`  | Toggle today's habit |

### Daily Logs
| Method | Endpoint                         | Description        |
|--------|----------------------------------|--------------------|
| GET    | `/api/daily-logs/:date`          | Get daily log      |
| PUT    | `/api/daily-logs/:date`          | Update daily log   |
| GET    | `/api/daily-logs`                | Get logs (range)   |
| POST   | `/api/daily-logs/:date/meals`    | Add meal           |
| DELETE | `/api/daily-logs/:date/meals/:id`| Remove meal        |

### Goals
| Method | Endpoint                    | Description       |
|--------|-----------------------------|--------------------|
| GET    | `/api/goals`                | Get all goals      |
| POST   | `/api/goals`                | Create goal        |
| PUT    | `/api/goals/:id`            | Update goal        |
| DELETE | `/api/goals/:id`            | Delete goal        |
| PUT    | `/api/goals/:id/progress`   | Update progress    |

### Statistics
| Method | Endpoint               | Description          |
|--------|------------------------|----------------------|
| GET    | `/api/stats/dashboard` | Today's summary      |
| GET    | `/api/stats/weekly`    | Last 7 days          |
| GET    | `/api/stats/monthly`   | Last 30 days summary |
| GET    | `/api/stats/streaks`   | All habit streaks    |

### User
| Method | Endpoint                 | Description         |
|--------|--------------------------|---------------------|
| GET    | `/api/users/profile`     | Get profile         |
| PUT    | `/api/users/profile`     | Update profile      |
| PUT    | `/api/users/password`    | Change password     |
| PUT    | `/api/users/preferences` | Update preferences  |
| DELETE | `/api/users/account`     | Delete account      |
