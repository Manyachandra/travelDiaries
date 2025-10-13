const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { connectMongoDb } = require("./db/connect");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const videoRoute = require("./routes/video");
const audioRoute = require("./routes/podcast");
const { errorHandler } = require("./middleware/errorHandler");

dotenv.config();

// Security: Helmet middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images from different origins
}));

// Rate limiting for auth routes (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { success: false, message: 'Too many authentication attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for general API routes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());

// CORS configuration: allow localhost (dev) and the deployed frontend origin
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  process.env.FRONTEND_ORIGIN || 'https://travel-diaries-omega.vercel.app',
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow non-browser clients
    const vercelPattern = /^https:\/\/travel-diaries-[a-z0-9-]+\.vercel\.app$/i;
    if (allowedOrigins.indexOf(origin) !== -1 || vercelPattern.test(origin)) {
      return callback(null, true);
    }
    // Reject without throwing to avoid 500s on preflight
    return callback(null, false);
  },
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
// Serve images with a graceful fallback to avoid 404s in the frontend
app.use("/images", (req, res, next) => {
  const requestedPath = (req.path || "/").replace(/^\/+/, "");
  const absolutePath = path.join(__dirname, "images", requestedPath);
  // If no file specified or file missing, return a default image
  fs.stat(absolutePath, (err, stats) => {
    if (err || !stats || !stats.isFile()) {
      // Pick an existing image in the repo as a generic fallback
      return res.sendFile(path.join(__dirname, "images", "1644753504507blog1.jpg"));
    }
    next();
  });
});
app.use("/images", express.static(path.join(__dirname, "/images")));

// Using MongoDB URL from environment (MONGO_URL)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({ success: true, message: "File has been uploaded" });
});

// Apply rate limiters
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/users", apiLimiter, userRoute);
app.use("/api/posts", apiLimiter, postRoute);
app.use("/api/categories", apiLimiter, categoryRoute);
app.use("/api/video", apiLimiter, videoRoute);
app.use("/api/audio", apiLimiter, audioRoute);

// Health check: report MongoDB and app status without leaking secrets
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const redact = (s = '') => (typeof s === 'string' ? s.replace(/:(?:[^@]+)@/, ':***@') : '');
  const readyStates = ['disconnected','connected','connecting','disconnecting'];
  const ready = mongoose.connection?.readyState;
  res.status(200).json({
    status: 'ok',
    mongo: {
      connected: ready === 1,
      state: readyStates[ready] || String(ready),
      hasEnv: !!process.env.MONGO_URL,
      uriPreview: redact(process.env.MONGO_URL || ''),
    },
    env: {
      vercel: !!process.env.VERCEL,
      node: process.version,
    }
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler (must be last)
app.use(errorHandler);

connectMongoDb()
  .then(() => {
    const PORT = process.env.PORT || "8000";
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log("Backend is running.");
      });
    }
  })
  .catch(() => {
    process.exit(1);
  });

module.exports = app;