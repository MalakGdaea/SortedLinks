# SortedLinks — Smart Bookmark Manager

[Live Demo](https://sortedlinks.vercel.app/) | [Backend API Documentation](#)

**[SortedLinks](https://sortedlinks.vercel.app/)** is a powerful tool designed to help you **[organize bookmarks](https://sortedlinks.vercel.app/)** and **save links** into custom collections and spaces. It solves digital clutter by providing instant access to your saved knowledge across any device.

![SortedLinks Preview](frontend/public/og-image.jpg)

## Features

- User registration and login (JWT)
- Create, update, delete bookmarks
- Organize bookmarks into collection and spaces
- Protected API routes

## Tech stack

- Frontend: React (Create React App)
- Backend: Node.js, Express
- Database: MongoDB (mongoose)

## Repository structure

- `backend/` — Express server, API routes, controllers, services
- `frontend/` — React app and UI components

## Prerequisites

- Node.js (v16+ recommended)
- npm (comes with Node.js)
- MongoDB instance (local or hosted)

## Environment

Create a `.env` file in the `backend/` folder with at least the following variables:

- `MONGODB_URI` — MongoDB connection string (default: `mongodb://localhost/bookmarksDB`)
- `PORT` — (optional) backend port, default `3000`
- `JWT_SECRET` — secret for signing JWT tokens (set a strong value in production)

Server port recommendation: for local development this project uses `3012` by default in the frontend config.
Set `PORT=3012` in the backend `.env` and in the frontend use the environment variable `REACT_APP_SERVER_ROUTE` (for example `REACT_APP_SERVER_ROUTE=http://localhost:3012/`) or ensure your frontend API URL points to `http://localhost:3012/`.

## Setup & Run

1. Backend

```bash
cd backend
npm install
npm start
```

2. Frontend

```bash
cd frontend
npm install
npm start
```

This starts the React development server (usually on `http://localhost:3000`).


## Notes

- Default MongoDB connection fallback is `mongodb://localhost/bookmarksDB` (see `backend/server/services/databaseManager.js`).
- Default JWT secret fallback exists in development, but set `JWT_SECRET` for real deployments.

