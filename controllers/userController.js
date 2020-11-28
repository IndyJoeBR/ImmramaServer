const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Express = require('express');
const userController = Express.Router();
const sequelize = require("../db");
const UserModel = sequelize.import("../models/User");


// **********   REGISTER   **********  <=----- FUNCTIONAL -----=>
// User Register Controller .../user/register
// Heroku: https://immramaserver.herokuapp.com/user/register
// Postman Test: POST, ^^^^^^^^, set to Body, raw, user: username, password, email-address
userController.post('/register', function(request, response){

  let username = request.body.user.username;
  let password = request.body.user.password;
  let userEmail = request.body.user.userEmail;
  let userAdmin = false;

  UserModel.create({
    username: username,
    passwordhash: bcrypt.hashSync(password, 10),
    userEmail: userEmail,
    userAdmin: userAdmin
  })
  .then( 
    function createSuccess(user) {      // 'user' holds the data returned from success
    let userToken = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
    //                 .sign (  payload,           signature        {expiration setting}); 
      response.json({
        user: user,
        message: '[server] New user has been registered',
        sessionToken: userToken
      })              
    },
    function createError(err) {
      response.send(500, err.message);
    }
  )

});  //  End of user registration/creation


// **********   LOGIN   **********  <=----- FUNCTIONAL -----=>
// User Login Controller .../user/login
// Heroku: https://immramaserver.herokuapp.com/user/login
// Postman Test: POST, ^^^^^^^^, set to Body, raw, user: username, password;
//               (can use same data just sent in Register if available)
userController.post('/login', function(request, response) {
  
  UserModel.findOne( { where: { username: request.body.user.username } } )     
  .then(
    function(retrievedUserData) {
      if(retrievedUserData) {
        bcrypt.compare(
          request.body.user.password,
          retrievedUserData.passwordhash,
          function (err, matches) { 
            console.log('[server] the user credentials match:', matches);
            if (matches) {
              let usersToken = jwt.sign({id:retrievedUserData.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
              response.json({
                user: retrievedUserData,
                message: "[server] user successfully authenticated",
                sessionToken: usersToken
              });
            } else {
              response.status(502).send({ error: "[server] failed to authenticate user" });
            }});
      } else {
        response.status(500).send({ error: "[server] failed to authenticate user" });
      }
    },
    function (err) {
      response.status(501).send({ error: "[server] failed to authenticate user" });
    }
);
}); //  End of user login





// **********   USER INFO   **********  <=----- FUNCTIONAL -----=>
// REQUIRES: username
// User Info Controller .../user/userinfo
// Heroku: https://immramaserver.herokuapp.com/user/userinfo/:username
//   ex: https://immramaserver.herokuapp.com/user/userinfo/herokuUser01
// Postman Test: GET, ^^^^^^^^, set to Body, none, username in url (no :)
userController.get('/userinfo/:username', function(request, response) {
  
  UserModel.findOne({
    where: {username: request.params.username}      // look in URL for username
  })
  .then(
    function findOneSuccess(data) {
      response.json(data);
      response.send("[server] User data request went through!");
    },
    function findOneError(err) {
      response.send(500, err.message);
    }
  );
});  //  End of user profile retrieval




// **********   CHANGE PASSWORD   **********  <=----- FUNCTIONAL -----=>
// REQUIRES: username, password (current/old), password (new)
// User Change Password Controller .../user/changepassword
// Heroku: https://immramaserver.herokuapp.com/user/changepassword
// Postman Test: PUT, ^^^^^^^^, set to Body, raw, user: username, oldpassword, &
//                                                          newpassword
userController.put('/changepassword', function(request, response) {

  let username = request.body.user.username;
  let oldPassword = request.body.user.oldPassword;
  let newPassword = request.body.user.newPassword;

  UserModel.findOne ( { where: {username: username} } )
    .then (
      function(user) {
        if (user) {
          bcrypt.compare(oldPassword, user.passwordhash,
            function (err, matches) {
              if (matches) {
                user.passwordhash = bcrypt.hashSync(newPassword, 12)
                user.update(user, {fields: ['passwordhash'] })
                .then ( () => {
                  response.status(200).send(user);
                })
              } else {
                response.status(502).send( {error: "[server] Old password did not match."});
              }
            })  //  end of bcrypt
        } else {
          response.status(502).send( {error: "[server] Failed to authenticate"});
        }
      }, //  end of first function
      function (err) {
        response.status(501).send( {error: "[server] Password change failed."})
      }
    )
});  //  End of change password



// **********   DELETE   **********  <=----- FUNCTIONAL -----=>
// REQUIRES: username, password
// User DELETION Controller .../user/smite
// Heroku: https://immramaserver.herokuapp.com/user/smite
userController.delete('/smite', function(request, response) {

  let username = request.body.user.username;
  let password = request.body.user.password;

  UserModel.findOne( {where: { username: username} } )
    .then (
      function(user) {
        if (user) {
          console.log("[server] User to be deleted:", user);
          bcrypt.compare(password, user.passwordhash,
            function(err, matches) {
              if(matches) {
                UserModel.destroy( {
                  where: { username: username } } ) // destroy
                  .then (
                    function deleteUserSuccess(data) {
                      response.send("[server] user has been terminated, but the journey remains.")
                    },
                    function deleteUserError(err) {
                      response.send(500, err.message);
                    }
                  ) //  end of second then
                } // end of IF(matches)
              } //  end of function(err, matches)
          ) //  end of bcrypt
        } //  end of IF (user)
      } //  end of function(user)
    ) //  end of first then
});  //  End of user destruction



//********************************************************** 
// User Test Controller .../user/userTest
// Heroku:  https://immramaserver.herokuapp.com/user/userTest
// Postman Test: GET, ^^^^^^^^, set to Headers
userController.get('/userTest', function(request, response){
  response.send("[server] User test went through!")
}); //  Keep for debug
//***********************************************************

module.exports = userController;