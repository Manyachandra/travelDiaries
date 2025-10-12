const mongoose = require("mongoose");

async function connectMongoDb() {
  const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/traveldiaries";
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000,
    });
    console.log("Database successfully connected ✅");
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
    throw err;
  }
}

module.exports = { connectMongoDb };