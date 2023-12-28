const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      //required: true,
      //unique: true,
    },
    desc: {
      type: String,
    //  required: true,
    },
    Poster: {
      type: String,
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    username: {
      type: String,
     // required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    city:{
      type:String,
      required:true

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("VideosUpload", VideoSchema);