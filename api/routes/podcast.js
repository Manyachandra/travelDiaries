const mongoose = require("mongoose");
const AudiosUpload =require("../models/Podcast");

const{ sendError,sendSuccess }= require("../helpers/help") ;
const router = require("express").Router();


///POST

  /// Category
  router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    const city=req.query.city;
    console.log(city);

    console.log(catName);
    try {
      let audios;
      if(city && catName){
        
        audios= await AudiosUpload.find({$and:[{city:city},{categories: {
          $in: [catName],
        } }]});
        
      }
     else if (username) {
        audios = await AudiosUpload.find({ username });
        
      } 
      else if (city) {
        audios = await AudiosUpload.find({ city });
      } 

      else if (catName) {
        
        audios = await AudiosUpload.find({
          categories: {
            $in: [catName],
          },
        });
       
      } else {
        audios = await AudiosUpload.find();
      }
      console.log(audios)
      res.status(200).json(audios);
    } catch (err) {
      res.status(500).json(err);
    }
  });




  router.post("/", async (req, res) => {
        try {
         // var {title,desc,video,username,categories}=req.body;
         // if(!title){
         //    return sendError(res, "Title is not provided",400);
         // }
         // if(!desc){
         //    return sendError(res, "Description is not provided",400);
         // }
         // if(!video){
         //    return sendError(res, "Please Mention the videoURL",400);
         // }
       
         // if(!username){
         //    return sendError(res, "Username cant be left empty",400);
         // }


            var newAudio =
             new AudiosUpload({
               
               username:req.body.username,
               Poster:req.body.Poster,

                audio: req.body.audio,
                desc:req.body.desc,
                title:req.body.title,
                city:req.body.city,
 categories:req.body.categories,
   


    
            })
           

        const Audio=    await newAudio.save();
            return sendSuccess(res,Audio,200);
        }
        catch (err) {
            console.log(err);
            return sendError(res, "Audio Upload failed !!!!!",500);
        }
    
      
     

    })
    module.exports = router;