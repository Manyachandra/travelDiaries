# Travel Diaries

Full‑stack MERN application for blogging, videos, and podcasts. The repo contains:

- api: Node.js/Express REST API with MongoDB (Mongoose) and file uploads (Multer)
- blog: React frontend (CRA) with Axios, Firebase Storage uploads for media, and client auth context

### Features
- Auth: register/login, profile update
- Posts: create/read/update/delete with categories and city filter
- Videos/Podcasts: upload media to Firebase Storage, store URLs in MongoDB
- Images: served from API `/images` or uploaded via Firebase (thumbnails)

---

## Quick Start

Prereqs: Node 18+ and npm. MongoDB Atlas (or local), Firebase project with Storage enabled.

### 1) Install
```
cd api && npm install
cd ../blog && npm install
```

### 2) Environment
Create the following files locally (do not commit):

api/.env
```
MONGO_URL=your-mongodb-atlas-uri
PORT=8000
```

blog/.env
```
PORT=3001
# In development, the frontend uses setupProxy to call the API via /api and /images.
# Leave REACT_APP_API_BASE_URL empty in dev; set it for production builds.
REACT_APP_API_BASE_URL=
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
REACT_APP_FIREBASE_STORAGE_BUCKET=<project-id>.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=...
REACT_APP_FIREBASE_APP_ID=...
REACT_APP_FIREBASE_MEASUREMENT_ID=...
```

Firebase (Console):
- Enable Storage
- Authentication → enable Anonymous (or use Email/Password)
- Storage Rules (dev):
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} { allow read, write: if request.auth != null; }
  }
}
```

### 3) Run
```
# API
cd api && npm start

# Frontend
cd blog && npm start
```
Open `http://localhost:3001`.

### 4) Seed demo data (optional)
```
cd api && npm run seed
```

---

## Project Structure
- api/index.js: Express app bootstrap; Mongo connection; routes
- api/routes/*: auth, users, posts, categories, video, podcast
- api/models/*: Mongoose models
- blog/src: React app; pages and components
- blog/src/firebase/index.js: Firebase compat SDK init (reads only REACT_APP_* env)
- blog/src/setupProxy.js: Proxies `/api` and `/images` → API host (uses `REACT_APP_API_BASE_URL` only in prod)

---

## Common Tasks

Create Post (Write page UI):
1) Upload image → API `/api/upload`
2) Submit form → API `/api/posts`

Upload Video/Audio:
1) Upload media + thumbnail → Firebase Storage
2) Save record → API `/api/video` or `/api/audio`

Environment/Ports:
- API reads `PORT` from `api/.env`
- Frontend reads `PORT` from `blog/.env`
- Proxy target set via `REACT_APP_API_BASE_URL`

---

## Security & Public Repo
- All credentials are read from `.env` files; `.env` is in `.gitignore`
- For PRs, provide `.env.example` values (no secrets)
- Harden Storage rules before production (size/type limits, path scoping)

---

## API Endpoints (high level)
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Users: `PUT/DELETE/GET /api/users/:id`
- Posts: `GET /api/posts`, `GET /api/posts/:id`, `POST /api/posts`, `PUT/DELETE /api/posts/:id`
- Categories: `GET/POST /api/categories`
- Upload: `POST /api/upload` (Multer → `/images`)
- Videos: `GET/POST /api/video`
- Audio: `GET/POST /api/audio`

---

## Troubleshooting
- 500 on `/api/posts`: ensure title, desc, city, and username are provided
- Upload stuck at 0%: enable Firebase Anonymous auth or relax Storage rules
- Proxy errors: in dev, ensure both servers run (3001 ↔ 8000). In prod, set `REACT_APP_API_BASE_URL` to your API origin.

---

## License
MIT
