const mongoose = require("mongoose");

const AudioSchema = new mongoose.Schema(
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
    audio: {
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
      required:false

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("AudiosUpload", AudioSchema);