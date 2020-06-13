const express = require("express");
const router= express.Router();  //INITIALISE ROUTE USING EXPRESS FRAMEWORK
const mongoose = require("mongoose");
const Feed=require("../models/feed_model");
var path = require("path")


//A route is a section of Express code that associates an HTTP verb (GET, POST, PUT, DELETE, etc.), a URL path/pattern, and a function that is called to handle that pattern.

//ROUTE FUNCTION or API-
// IT SIMPLY RENDERS THE HTML PAGE STORED IN VIEW FOLDER IF A GET REQUEST THROUGH THE BELOW URL IS MADE.
router.get('/addfeed',(req,res)=>{
    // res.render('feed_form.html')    //when template engine like ejs and pug is there
    // res.sendFile(__dirname + '/../views/feed_form.html')     // without using path join gives forbidden error
    res.sendFile(path.join(__dirname, '..', 'views', 'form.html'))  //with path.join it works 
})
// SAME  FUNCTION
// IT FIRST FINDS ALL THE AVAILABLE FEEDS STORED IN FEED COLLECTION OF DATABASE AND PASSES THE RESULT TO PROJECTLIST.PUG IN FORM OF ARRAY OF FEEED OBJECTS


router.get('/getproject',(req,res) =>{               // FUNCTION CALL
    Feed.find({})                                    //FINDING THE ARRAY OF FEED OBJS IN FEED COLLECTION OF DATABASE
   
   
    .exec(function(err,feed){                              // "feed" IS THE REQUIRED ARRAY OF FEED'S OBTAINED BY function Feed.find()
      if(err){console.log("error in retrieving feeds");    // for the use of the array of feed once found.
      }
      else{
        console.log(feed)                    // print statement for backend conole.
        res.render("projectlist.pug", {feed: feed});
      }
       });                                          
     
    
});
router.post('/addfeed',(req,res) =>{
 
    const feed = new Feed({
        _id:new mongoose.Types.ObjectId(),
       
        Title: req.body.Title,
        Description: req.body.Description
       
    });
    feed.save().then(
        (feed)=>{console.log('the feed is' +feed)
        res.json(feed)}
    ).catch(err=>console.log('the error is' +err));


});

module.exports=router;