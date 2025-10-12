const express = require("express");
const cors = require("cors");


const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { connectMongoDb } = require("./db/connect");
const multer = require("multer");
const path = require("path");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const videoRoute=require("./routes/video");
const audioRoute=require("./routes/podcast");

dotenv.config();
app.use(express.json());
app.use(cors())
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