const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Express = require('express');
const userController = Express.Router();
const sequelize = require("../db");
const UserModel = sequelize.import("../models/User");



// User Test Controller .../user/register
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
        message: '[server] new user has been registered',
        sessionToken: userToken
      })              
    },

    function createError(err) {
      response.send(500, err.message);
    }
  )

});  //  End of user registration/creation


// User Test Controller .../user/login
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
























// User Test Controller .../user/userinfo
userController.get('/userinfo', function(request, response) {
  response.send("[server] user data request went through!")
});  //  End of user profile retrieval

// User Test Controller .../user/changepassword
userController.put('/changepassword', function(request, response) {
  response.send("[server] user changepassword went through!")
});  //  End of change password

// User Test Controller .../user/smite
userController.delete('/smite', function(request, response) {
  response.send("[server] user has been terminated, but his journey remains.")
});  //  End of user destruction





//********************************************************** 
// User Test Controller .../user/userTest
userController.get('/userTest', function(request, response){
  response.send("[server] user test went through!")
}); //  Keep for debug
//***********************************************************

module.exports = userController;