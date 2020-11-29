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

// **********   CREATE Chapter   **********  <=----- FUNCTIONAL -----=>
// Journey Creation Controller .../chapter/chapterCreate
// Heroku: https://immramaserver.herokuapp.com/chapter/chapterCreate
// Postman: POST, ^^^^^^^^^^^^^
chapterController.post('/chapterCreate', function(request, response) {

  let userId = request.body.user.userId;
  let journeyId = request.body.journey.journeyId;
  let chapterTitle = request.body.chapter.chapterTitle;
  let chapterDate = request.body.chapter.chapterDate;
  let chapterShortDesc = request.body.chapter.chapterShortDesc;
  let chapterStory = request.body.chapter.chapterStory;
  let chapterImage = request.body.chapter.chapterImage;
  let chapterVideo = request.body.chapter.chapterVideo;

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




// **********   GET ALL Chapters   **********  <=----- FUNCTIONAL -----=>
// Journey Creation Controller .../chapter/getAllChapters
// Heroku: https://immramaserver.herokuapp.com/chapter/getAllChapters
// Postman: GET, ^^^^^^^^^^^^^
chapterController.get('/getAllChapters', function(request, response) {

  ChapterModel.findAll()
    .then(
      function findAllSuccess(allChapters) {
        response.json({
          allChapters: allChapters,
          message: "[server] All chapters recovered."
        })
      },
      function findAllError(err) {
        response.json(500, err.message)
      }
    );
});  //  End of get all chapters



chapterController.get('/chapter/:journeyId', function(request, response) {
  response.send("Chapters for journey retrieved")
});  //  End of get all chapters by journey id


// **********   GET ALL CHAPTERS IN JOURNEY   **********<=----- FUNCTIONAL -----=>
// Get all chapters Controller .../getAllUsersJourneys/:username
// Heroku: https://immramaserver.herokuapp.com/chapter/getAllJourneysChapters/:journeyId
// Postman: GET, ^^^^^^^^^^^^^, username in URL
chapterController.get('/getAllJourneysChapters/:journeyId', function(request, response) {

  ChapterModel.findAll({
    where: {journeyId: request.params.journeyId}
    })
    .then(
      function findAllSuccess(data) {
        response.json(data);
        response.send("[server] All chapters in journey recovered.")
      },
      function findAllError(err) {
        response.send(500, err.message);
      }
    );
});  //  End of get owner journeys




// **********   GET ONE CHAPTER   **********     <=----- FUNCTIONAL -----=>
// Get One Chapter Controller .../getOneChapter/:id
// Heroku: https://immramaserver.herokuapp.com/chapter/getOneChapter/:id
// Postman: GET, ^^^^^^^^^^^^^, userId in URL
chapterController.get('/getOneChapter/:id', function(request, response) {

  ChapterModel.findByPk(request.params.id)
    .then(
      function findOneSuccess(data) {
        response.json(data);
        response.send("[server] Chosen chapter retrieved.")
      },
      function findOneError(err) {
        response.send(500, err.message);
      }
    );
});  //  End of get chapter by id




// **********   UPDATE JOURNEY   ********** 
// Chapter Update Controller .../chapterUpdate/:id
// Heroku: https://immramaserver.herokuapp.com/chapter/chapterUpdate/:id
// Postman: PUT, ^^^^^^^^^^^^^, a lot
chapterController.put('/chapterUpdate/:id', function(request, response) {

  let userId = request.body.user.userId;
  let journeyId = request.body.journey.journeyId;
  let chapterTitle = request.body.chapter.chapterTitle;
  let chapterDate = request.body.chapter.chapterDate;
  let chapterShortDesc = request.body.chapter.chapterShortDesc;
  let chapterStory = request.body.chapter.chapterStory;
  let chapterImage = request.body.chapter.chapterImage;
  let chapterVideo = request.body.chapter.chapterVideo;

  ChapterModel.update( {
    chapterTitle: chapterTitle,
    chapterDate: chapterDate,
    chapterShortDesc: chapterShortDesc,
    chapterStory: chapterStory,
    chapterImage: chapterImage,
    chapterVideo: chapterVideo,
    journeyId: journeyId,
    userId: userId
  },
    {where: {id: request.params.id}}
  )
  .then(                                            // when complete
    function updateChapterSuccess(chapter) {        // if it was successful
      response.json({                               // return a JSON object
        chapter: chapter,                           // of the entry
        message: "[server] Chapter has been updated."
      });
    },
    function updateChapterError(err) {              // if not successful
      response.send(500, err.message);              // return an error message
    }
  );
});  //  End of update chapter




// **********   DELETE CHAPTER   **********      <=----- FUNCTIONAL -----=>
// Journey DELETION Controller .../smiteChapter/:id
// Heroku: https://immramaserver.herokuapp.com/chapter/smiteChapter/:id
chapterController.delete('/smiteChapter/:id', function(request, response) {

  ChapterModel
    .destroy({
      where: { id: request.params.id } 
    })
    .then(
      function deleteChapterSuccess(data){
        response.send('[server] Chapter has been deleted');
      },
      function deleteChapterError(err){
        response.send(500, err.message);
      }
    );
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