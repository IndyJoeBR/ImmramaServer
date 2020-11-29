const Express = require('express');
const chapterController = Express.Router();
const sequelize = require("../db");
const ChapterModel = sequelize.import('../models/Chapter');


//const JourneyModel = require("../models");




/*  TODO Chapter Routes
      GET/all
      GET/:id
      Get/:journey_id
      POST/create
      UPDATE/:id
      DELETE/:id
*/


chapterController.post('/chapterCreate', function(request, response) {
  response.send("Chapter creation succeeded!")
});  //  End of chapter creation


// **********   CREATE Chapter   **********        <=----- FUNCTIONAL -----=>
// Journey Creation Controller .../chapter/chapterCreate
// Heroku: https://immramaserver.herokuapp.com/chapter/chapterCreate
// Postman: POST, ^^^^^^^^^^^^^, user
chapterController.post('/chapterCreate', function(request, response) {

  let userId = request.body.user.userId;
  let journeyId = request.body.journey.journeyId;
  let chapterTitle = request.body.chapter.chapterTitle;
  let chapterDate = request.body.chapter.chapterDate;
  let chapterShortDesc = request.body.chapter.chapterShortDesc;
  let chapterStory = request.body.chapter.chapterStory;
  let chapterImage = request.body.chapter.chapterImage;
  let chapterVideo = request.body.chapter.chapterVide;

  ChapterModel.create({
    chapterTitle: chapterTitle,
    chapterDate: chapterDate,
    chapterShortDesc: chapterShortDesc,
    chapterStory: chapterStory,
    chapterImage: chapterImage,
    chapterVideo: chapterVideo,
    journeyId: journeyId,
    userId: userId
  })
  .then(                                      // when complete
    function createChapterSuccess(chapter) {  // if it was successful
      response.json({                         // return a JSON object
        chapter: chapter,                     // of the entry
        message: "[server] New chapter has been started." // and log it
      })
    },
    function createChapterError(err) {        // if not successful
      response.send(501, err.message);        // return an error message
    }
  );
});  //  End of journey creation


chapterController.get('/chapter/all', function(request, response) {
  response.send("All chapters retrieved")
});  //  End of get all chapters

chapterController.get('/chapter/:journeyId', function(request, response) {
  response.send("Chapters for journey retrieved")
});  //  End of get all chapters by journey id


chapterController.get('/chapter/:id', function(request, response) {
  response.send("Chapter retrieved by id!")
});  //  End of get chapter by id


chapterController.put('/chapterUpdate/:id', function(request, response) {
  response.send("Chapter updated!")
});  //  End of update chapter

chapterController.delete('/chapterDelete/:id', function(request, response) {
  response.send("Chapter deleted!")
});  //  End of chapter deletion



//******************************************************************
// Chapter Test Controller .../journey/journeyTest
// Heroku:  https://immramaserver.herokuapp.com/journey/journeyTest
// Postman Test: GET, ^^^^^^^^, set to Headers
chapterController.get('/chapterTest', function(request, response){
  response.send("[server] Chapter test went through!")
});
//******************************************************************

module.exports = chapterController;