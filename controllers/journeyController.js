const Express = require('express');
const journeyController = Express.Router();
const sequelize = require("../db");
const JourneyModel = sequelize.import('../models/Journey');
//const JourneyModel = require("../models");

/*  TODO Journey Routes
      GET/all - get all journeys
      GET/:id - get one journey by id
      Get/:journey_owner - get one user's journeys
      POST/create - create a journey
      UPDATE/:id - update a journey
      DELETE/:id - delete a journey
*/
   
// **********   CREATE JOURNEY   **********        <=----- FUNCTIONAL -----=>
// REQUIRES: JourneyUsername, journeyTitle, journeyStartDate, journeyEndDate, journeyDesc
// Journey Creation Controller .../journey/journeyCreate
// Heroku: https://immramaserver.herokuapp.com/journey/journeyCreate
// Postman: POST, ^^^^^^^^^^^^^, user
journeyController.post('/journeyCreate', function(request, response) {
  let JourneyUsername = request.body.user.username;
  let userId = request.body.user.userId;
  let journeyTitle = request.body.journey.journeyTitle;
  let journeyStartDate = request.body.journey.journeyStartDate;
  let journeyEndDate = request.body.journey.journeyEndDate;
  let journeyDesc = request.body.journey.journeyDesc;
  console.log("The body:", request.body);

  JourneyModel.create({
    JourneyUsername: JourneyUsername,
    userId: userId,
    journeyTitle: journeyTitle,
    journeyStartDate: journeyStartDate,
    journeyEndDate: journeyEndDate,
    journeyDesc: journeyDesc
  })
  .then(                                                  // when complete
    function createJourneySuccess(journey) {              // if it was successful
      response.json({                                     // return a JSON object
        journey: journey,                                 // of the entry
        message: "[server] New journey has been started." // and log it
      })
    },
    function createJourneyError(err) {                    // if not successful
      response.send(501, err.message);                    // return an error message
    }
  );
});  //  End of journey creation



// **********   GET ALL JOURNEYS   **********
// REQUIRES: n/a
// Journey Creation Controller .../journey/all
// Heroku: https://immramaserver.herokuapp.com/journey/all
// Postman: GET, ^^^^^^^^^^^^^
journeyController.get('/journey/all', function(request, response) {

  console.log("*********************************************************");
  console.log("Recovering journeys from all users.");

  JourneyModel.findAll()
    .then(
      function findAllSuccess(data) {
        response.json({
          allJourneys: allJourneys,
          message: "[server] All journeys recovered."
        })
      },
      function findAllError(err) {
        response.json(500, err.message)
      }
    );
});  //  End of journey get all


// **********   GET ALL JOURNEYS BY USER   **********
// REQUIRES: userId
// Journey Creation Controller .../journey/:userId
// Heroku: https://immramaserver.herokuapp.com/journey/:username
// Postman: GET, ^^^^^^^^^^^^^, username in URL
journeyController.get('/journey/:username', function(request, response) {

  let JourneyUsername = request.params.username
  console.log("The username is:", JourneyUsername);

  JourneyModel.findAll({
    where: {JourneyUsername: JourneyUsername}
    })
    .then(
      function findAllSuccess(data) {
        response.json(data);
        response.send("[server] All journeys by user recovered.")
      },
      function findAllError(err) {
        response.send(500, err.message);
      }
    );
});  //  End of get owner journeys



// **********   GET ONE JOURNEY   **********
// REQUIRES: journeyId
// Journey Creation Controller .../journey/id
// Heroku: https://immramaserver.herokuapp.com/journey/:id
// Postman: GET, ^^^^^^^^^^^^^, userId in URL
journeyController.get('/journey/:id', function(request, response) {
  console.log("The journey ID#:",request.params.id);
  //JourneyModel.findOne({
  //    where: {id: request.params.id}
  //  })
  JourneyModel.findByPk(request.params.id)
    .then(
      function findOneSuccess(data) {
        response.json(data);
        response.send("[server] Chosen journey retrieved.")
      },
      function findOneError(err) {
        response.send(500, err.message);
      }
    );
});  //  End of get journey by id



// **********   UPDATE JOURNEY   **********
// REQUIRES: JourneyUsername, journeyTitle, journeyStartDate, journeyEndDate, journeyDesc
// Journey Update Controller .../journey/:userId
// Heroku: https://immramaserver.herokuapp.com/journey/:userId
// Postman: PUT, ^^^^^^^^^^^^^, userId in URL
journeyController.put('/journeyUpdate/:id', function(request, response) {

  let journeyId = request.params.id;
  let JourneyUsername = request.user.username;
  let journeyTitle = request.body.journey.journeyTitle;
  let journeyStartDate = request.body.journey.startDate;
  let journeyEndDate = request.body.journey.endDate;
  let journeyDesc = request.body.journey.journeyDesc;

  JourneyModel.update( {
    JourneyUsername: JourneyUsername,
    journeyTitle: journeyTitle,
    journeyStartDate: journeyStartDate,
    journeyEndDate: journeyEndDate,
    journeyDesc: journeyDesc
  },
    {where: {id: journeyId}})
  .then(                                            // when complete
    function updateJourneySuccess(updatedJourney) {    // if it was successful
      response.json({                               // return a JSON object
        updatedJourney: updatedJourney                      // of the entry
      });
    },
    function updateJourneyError(err) {              // if not successful
      response.send(500, err.message);              // return an error message
    }
  );
  response.send("Journey update went through!")
});  //  End of update journey



// **********   DELETE JOURNEY   **********
// REQUIRES: id (journey id), userId (owner's id)
// Journey DELETION Controller .../journey/journeyDelete/:id
// Heroku: https://immramaserver.herokuapp.com/user/smite
// Postman: DELETE, ^^^^^^^^^^^^^, user
journeyController.delete('/journeyDelete/:id', function(request, response) {
  let journeyID = request.params.id;
  let ownerID = request.user.id;

  JourneyModel
    .destroy({
      where: { id: journeyID, userId: ownerID } 
    })
    .then(
      function deleteJourneySuccess(data){
        response.send('[server] Journey has been deleted');
      },
      function deleteJourneyError(err){
        response.send(500, err.message);
      }
    );
});  //  End of journey deletion




//******************************************************************
// Journey Test Controller .../journey/journeyTest
// Heroku:  https://immramaserver.herokuapp.com/journey/journeyTest
// Postman Test: GET, ^^^^^^^^, set to Headers
journeyController.get('/journeyTest', function(request, response){
  response.send("[server] Journey test went through!")
});
//******************************************************************



module.exports = journeyController;