const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema(
  {
    action: { type: String, enum: ["register", "login"], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    ip: { type: String },
    userAgent: { type: String },
    uaPlatform: { type: String },
    uaBrands: { type: String },
    uaMobile: { type: String },
    referer: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);


