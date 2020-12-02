const jwt = require('jsonwebtoken'); //if you get an error stating something is being redeclared, switch it from a const to a var or let
const User = require('../db').import('../models/User');

const validateSession = (request, response, next) => { 
  console.log("***** Starting validation process.******");
  if (request.method == 'OPTIONS') {
    return next()
  } else {
    const token = request.headers.Authorization;
    console.log(request.headers)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        console.log(`INVALID TOKEN: ${decodedToken}`)
        if (!err && decodedToken) {
            User.findOne({ where: {id: decodedToken.id}})
            .then(user => {
                if (!user) throw 'err';
                request.user = user;
                console.log("This is request.user:", request.user);
                return next();
            })
            .catch(err => {next(err); console.log('this could be where it broke')})
        } else {
          request.errors = err;
          response.status(401).send("This is a bad token")
        }
    })}
};

module.exports = validateSession;




/*
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models'); // pulls UserModel directly with sequelize importing it
//let sequelizeInstance = require('../database');              // ****  no longer needed, previously require for import statement (#4)
//let UserModel = sequelizeInstance.import('../models/user');  // kept in case sequelize is being difficult

const ValidateJWTMiddleware = (request, response, next) => {
  if (request.method == 'OPTIONS') {
      next()
  } else {
    let sessionToken = request.headers.authorization;                                        // gets token from 'authorization' in the header
    console.log("Validation token:", sessionToken)     // and displays it in the console   ************   DELETE   ************
    if (!sessionToken) 
      return response.status(403).send({ auth: false, message: '[server] No token provided.'});  // IF NOT-token (no token) is the case, send error
    else {                                                                                   // otherwise, go on to decode the token
      jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {                   // verify decodes token with secret; if good, decoded is given the payload, else undefined
        if(decoded){                                                                         // if 'decoded' has a value
          UserModel.findOne({where: { id: decoded.id}})
          .then(user => { // findOne looks for a matching id in the users table and passes it
            request.user = user;  // the callback sets the user value for the request
            next();               // and moves the request on to the next stage
          },
          function(){                                                                        // if no matching id is found, an error message is thrown.
            response.status(401).send({error: '[server] Not authorized'});
        });
        } else {                                                                             // if no value for decoded, an error message is thrown
          response.status(400).send({error: '[server] Not authorized'});
        }
      });
    }
  }
};

module.exports = ValidateJWTMiddleware;
*/