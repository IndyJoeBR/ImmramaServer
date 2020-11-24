const Express = require('express');
const journeyController = Express.Router();
const theDatabase = require("../db");
const UserModel = require('../models/Journey');

//const JourneyModel = require("../models");






// User Test Controller .../journey/journeyTest
journeyController.get('/journeyTest', function(request, response){
  response.send("Journey test went through!")
});


/*  TODO Journey Routes
      GET/all
      GET/:id
      Get/:journey_owner
      POST/create
      UPDATE/:id
      DELETE/:id
*/


journeyController.post('/journeyCreate', function(request, response) {
});  //  End of journey creation


journeyController.get('/journey/all', function(request, response) {
});  //  End of user login

journeyController.get('/journey/:journey_owner', function(request, response) {
});  //  End of user login


journeyController.get('/journey/:id', function(request, response) {
});  //  End of user profile retrieval


journeyController.put('/journeyUpdate', function(request, response) {
});  //  End of update journey

journeyController.delete('/journeyDelete', function(request, response) {
});  //  End of journey deletion






module.exports = journeyController;