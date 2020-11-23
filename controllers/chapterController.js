const Express = require('express');
const chapterController = Express.Router();
const theDatabase = require("../db");
const UserModel = require('../models/Chapter');


//const JourneyModel = require("../models");



// User Test Controller .../chapter/chapterTest
chapterController.get('/chapterTest', function(request, response){
  response.send("Chapter test went through!")
});



/*  TODO Chapter Routes
      GET/all
      GET/:id
      Get/:journey_id
      POST/create
      UPDATE/:id
      DELETE/:id
*/


chapterController.post('/chapterCreate', function(request, response) {
});  //  End of journey creation


chapterController.get('/journey/all', function(request, response) {
});  //  End of user login

chapterController.get('/journey/:journey_owner', function(request, response) {
});  //  End of user login


chapterController.get('/journey/:id', function(request, response) {
});  //  End of user profile retrieval


chapterController.put('/journeyUpdate', function(request, response) {
});  //  End of update journey

chapterController.delete('/journeyDelete', function(request, response) {
});  //  End of journey deletion


module.exports = chapterController;