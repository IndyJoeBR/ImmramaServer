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

// **********   CREATE JOURNEY   **********
// REQUIRES: JourneyUsername, journeyTitle, journeyStartDate, journeyEndDate, journeyDesc
// Journey Creation Controller .../journey/journeyCreate
// Heroku: https://immramaserver.herokuapp.com/journey/journeyCreate
// Postman: POST, ^^^^^^^^^^^^^, user
journeyController.post('/journeyCreate', function(request, response) {
  let JourneyUsername = request.user.username;
  console.log("JourneyUsername", JourneyUsername);
  let journeyTitle = request.body.journey.journeyTitle;
  console.log("journeyTitle", journeyTitle);
  let journeyStartDate = request.body.journey.startDate;
  console.log("journeyStartDate", journeyStartDate);
  let journeyEndDate = request.body.journey.endDate;
  console.log("journeyEndDate", journeyEndDate);
  let journeyDesc = request.body.journey.journeyDesc;
  console.log("journeyDesc", journeyDesc);

  JourneyModel.create({
    JourneyUsername: JourneyUsername,
    journeyTitle: journeyTitle,
    journeyStartDate: journeyStartDate,
    journeyEndDate: journeyEndDate,
    journeyDesc: journeyDesc
  })
  .then(                                            // when complete
    function createJourneySuccess(journey) {     // if it was successful
      response.json({                               // return a JSON object
        journey: journey,                     // of the entry
        message: "[server] New journey has been started."  // and log it
      })
    },
    function createJourneyError(err) {              // if not successful
      response.send("Clearly... there is a problem");
      response.send(500, err.message);              // return an error message
    }
  );
  response.send("Journey created!")
});  //  End of journey creation



// **********   GET ALL JOURNEYS   **********
// REQUIRES: n/a
// Journey Creation Controller .../journey/all
// Heroku: https://immramaserver.herokuapp.com/journey/all
// Postman: GET, ^^^^^^^^^^^^^
journeyController.get('/journey/all', function(request, response) {

  JourneyModel
    .findAll()
    .then(
      function findAllSuccess(allJourneys) {
        response.json(allJourneys)
      },
      function findAllError(err) {
        response.json(500, err.message)
      }
    );
  response.send("All journeys retrieved")
});  //  End of journey get all


// **********   GET ALL JOURNEYS BY USER   **********
// REQUIRES: userId
// Journey Creation Controller .../journey/:userId
// Heroku: https://immramaserver.herokuapp.com/journey/:userId
// Postman: GET, ^^^^^^^^^^^^^, userId in URL
journeyController.get('/journey/:userId', function(request, response) {

  let userId = request.params.userId;

  JourneyModel
    .findAll({
      where: {userId: userId}
    })
    .then(
      function findAllSuccess(allUsersJourneys) {
        response.json(allUsersJourneys);
      },
      function findAllError(err) {
        response.send(500, err.message);
      }
    );
  response.send("Journeys by user retrieved")
});  //  End of get owner journeys



// **********   GET ONE JOURNEY   **********
// REQUIRES: journeyId
// Journey Creation Controller .../journey/:userId
// Heroku: https://immramaserver.herokuapp.com/journey/:userId
// Postman: GET, ^^^^^^^^^^^^^, userId in URL
journeyController.get('/journey/:id', function(request, response) {
  let journeyId = request.params.id;

  JourneyModel
    .findOne({
      where: {id: journeyId}
    })
    .then(
      function findOneSuccess(oneUserJourney) {
        response.json(oneUserJourney);
      },
      function findOneError(err) {
        response.send(500, err.message);
      }
    );
  response.send("Journey by id went through!")
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