# Airth Job Queue Dashboard

A mini job queue dashboard built as part of the Airth React + NestJS Intern assignment.

The application allows users to view jobs, create jobs, and update their status. The backend handles job persistence, validation, and status updates.

## Live Links

**Frontend:**
https://airth-job-queue-dashboard-five.vercel.app/

**Backend:**
https://airth-job-queue-dashboard-8z40.onrender.com

**Jobs API:**
https://airth-job-queue-dashboard-8z40.onrender.com/jobs

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Features

* View jobs
* Create a new job
* Update job status
* Persist jobs using MongoDB
* Backend-side validation
* Error handling for invalid operations
* Prevent invalid status updates such as completing an already completed job

## Project Structure

```text
airth-job-queue-dashboard/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   ├── index.js
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/faizanmalik22/airth-job-queue-dashboard.git

cd airth-job-queue-dashboard
```

### 2. Run the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URL=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:3000
```

### 3. Run the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

## API

The main job API is available under `/jobs`.

Example:

```text
GET /jobs
```

The backend is responsible for handling the job state and validating updates before changing the database.

The general flow is:

```text
React Frontend
      ↓
REST API
      ↓
Express Backend
      ↓
MongoDB
```

## Validation and Edge Cases

One important case is when two clients try to update the same job.

The backend checks the current job status before applying an update. This means that if a job has already been completed, another request trying to complete the same job will be rejected instead of blindly updating the database.

This validation is handled on the backend rather than relying only on the frontend.

## Technology Trade-off

The assignment specified NestJS + SQLite for the backend.

I already had practical experience with Node.js and Express, but had limited experience with NestJS and SQLite. Since the assignment had a two-day deadline, I decided to use the backend stack I was already comfortable with so I could focus on completing the core functionality, API design, database persistence, validation, error handling, and deployment.

I understand that this differs from the requested backend stack. With more time, I would migrate the backend to NestJS + SQLite while keeping the same API structure and business logic.

## Assumptions and Trade-offs

* The backend is responsible for validating job state changes.
* Authentication and authorization were not implemented because they were outside the scope of the assignment.
* MongoDB was used for persistence because it was the database I was more comfortable working with within the given timeline.
* The UI was kept relatively simple because the assignment focused more on functionality, API/database design, and problem-solving than UI polish.

## Possible Improvements

With more time, I would work on the following:

* Migrate the backend to NestJS + SQLite as specified in the assignment.
* Add real-time job status synchronization using Socket.IO so multiple dashboard clients update immediately when a job changes.
* Add automated backend and frontend tests.
* Add authentication and authorization.
* Add pagination, filtering, and sorting for larger job lists.
* Improve loading and error states in the frontend.
* Add better logging and monitoring for the deployed backend.

## Author

Faizan Malik
