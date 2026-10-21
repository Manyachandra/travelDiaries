# Travel Diaries

Full‑stack MERN application for blogging, videos, and podcasts. The repo contains:

- `api`: Node.js/Express REST API with MongoDB (Mongoose) and file uploads (Multer)
- `blog`: React frontend (Create React App) with Axios, Firebase Storage uploads for media, and client auth context

## Features

- Auth: register/login, profile update
- Posts: create/read/update/delete with categories and city filter
- Videos/Podcasts: upload media to Firebase Storage, store URLs in MongoDB
- Images: served from API `/images` or uploaded via Firebase (thumbnails)

## Quick Start

Prereqs: Node 18+ and npm. MongoDB Atlas (or local), Firebase project with Storage enabled.

### 1) Install

```bash
cd api && npm install
cd ../blog && npm install
```

### 2) Environment

Create the following files locally (do not commit):

- `api/.env`
  ```bash
  MONGO_URL=your-mongodb-atlas-uri
  PORT=8000
  SECRET_KEY=your-secret-key-change-in-production
  ```

- `blog/.env`
  ```bash
  PORT=3001
  REACT_APP_API_BASE_URL=
  REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
  REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
  REACT_APP_FIREBASE_PROJECT_ID=your-project-id
  REACT_APP_FIREBASE_STORAGE_BUCKET=<project-id>.appspot.com
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
  REACT_APP_FIREBASE_APP_ID=your-app-id
  REACT_APP_FIREBASE_MEASUREMENT_ID=your-measurement-id
  ```

### 3) Run

```bash
# API
cd api && npm start

# Frontend
cd blog && npm start
```

Open `http://localhost:3001`.

### 4) Seed demo data (optional)

```bash
cd api && npm run seed
```

## Project Structure

- `api/index.js`: Express app bootstrap; Mongo connection; routes
- `api/routes/*`: auth, users, posts, categories, video, podcast
- `api/models/*`: Mongoose models
- `api/middleware/*`: auth, error handling
- `blog/src`: React app; pages and components
- `blog/src/firebase/index.js`: Firebase compat SDK init (reads only `REACT_APP_*` env)

## Environment/Ports

- API reads `PORT` and `SECRET_KEY` from `api/.env`
- Frontend reads `PORT` from `blog/.env`
- Proxy target set via `REACT_APP_API_BASE_URL`

## License

MIT
