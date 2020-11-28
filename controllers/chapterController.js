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