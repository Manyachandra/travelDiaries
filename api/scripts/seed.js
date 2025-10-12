const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { connectMongoDb } = require("../db/connect");
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");
const VideosUpload = require("../models/Videos");
const AudiosUpload = require("../models/Podcast");

(async () => {
  try {
    await connectMongoDb();

    const [travelCat, foodCat, natureCat] = await Category.insertMany([
      { name: "Travel" },
      { name: "Food" },
      { name: "Nature" },
    ], { ordered: false }).catch(() => Category.find({ name: { $in: ["Travel", "Food", "Nature"] } }));

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("password123", salt);
    await User.updateOne(
      { username: "demo" },
      { $setOnInsert: { username: "demo", email: "demo@example.com", password } },
      { upsert: true }
    );

    await Post.updateOne(
      { title: "First Trip to Iceland" },
      {
        $setOnInsert: {
          title: "First Trip to Iceland",
          city: "Reykjavik",
          desc: "Exploring waterfalls and glaciers.",
          username: "demo",
          categories: ["Travel", "Nature"],
        },
      },
      { upsert: true }
    );

    await VideosUpload.updateOne(
      { title: "Costa Rica Adventures" },
      {
        $setOnInsert: {
          title: "Costa Rica Adventures",
          desc: "Ziplining through the canopy.",
          Poster: "",
          video: "https://www.w3schools.com/html/mov_bbb.mp4",
          username: "demo",
          categories: ["Travel"],
          city: "San Jose",
        },
      },
      { upsert: true }
    );

    await AudiosUpload.updateOne(
      { title: "City Soundscapes" },
      {
        $setOnInsert: {
          title: "City Soundscapes",
          desc: "Walking tour with ambient audio.",
          Poster: "",
          audio: "https://www.w3schools.com/html/horse.mp3",
          username: "demo",
          categories: ["Travel"],
          city: "New York",
        },
      },
      { upsert: true }
    );

    console.log("Seed completed ✅");
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seed failed ❌", err);
    process.exit(1);
  }
})();


