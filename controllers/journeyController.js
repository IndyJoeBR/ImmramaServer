const Express = require('express');
const journeyController = Express.Router();
const sequelize = require("../db");
const JourneyModel = sequelize.require('../models/Journey');

//const JourneyModel = require("../models");




/*  TODO Journey Routes
      GET/all
      GET/:id
      Get/:journey_owner
      POST/create
      UPDATE/:id
      DELETE/:id
*/

//
journeyController.post('/journeyCreate', function(request, response) {
  response.send("Journey created!")
});  //  End of journey creation


journeyController.get('/journey/all', function(request, response) {
  response.send("All journeys retrieved")
});  //  End of journey get all

journeyController.get('/journey/:userId', function(request, response) {
  response.send("Journeys by user retrieved")
});  //  End of get owner journeys


journeyController.get('/journey/:id', function(request, response) {
  response.send("Journey by id went through!")
});  //  End of get journey by id


journeyController.put('/journeyUpdate', function(request, response) {
  response.send("Journey update went through!")
});  //  End of update journey

journeyController.delete('/journeyDelete', function(request, response) {
  response.send("Journey delete went through!")
});  //  End of journey deletion




//******************************************************************
// Journey Test Controller .../journey/journeyTest
// Heroku:  https://immramaserver.herokuapp.com/journey/journeyTest
// Postman Test: GET, ^^^^^^^^, set to Headers
journeyController.get('/journeyTest', function(request, response){
  response.send("Journey test went through!")
});
//******************************************************************



module.exports = journeyController;