const express = require("express");
const cors = require("cors");


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
const videoRoute=require("./routes/video");
const audioRoute=require("./routes/podcast");

dotenv.config();
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ],
  credentials: true,
}))
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
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/video", videoRoute);
app.use("/api/audio", audioRoute);

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