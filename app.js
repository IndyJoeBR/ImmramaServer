require("dotenv").config(); 
const express = require("express");
const sequelize = require("./db");
const app = express();

//const CORSmiddlewares = require("./middleware/CORSMiddleware");       //   DELETE IF NOT REQUIRED, now located in app.use directly

const userController = require('./controllers/userController');
const journeyController = require('./controllers/journeyController');
const chapterController = require('./controllers/chapterController');

app.use( require("./middleware/headers") );
app.use( express.json() );


// Test Route   http://localhost:3000   /immrama/test
// Heroku: https://immramaserver.herokuapp.com/immrama/test
// Postman Test: GET, ^^^^^^^^, set to Headers
app.use('/immrama/test', function(request, response) {
  response.send("[server] This is the test endpoint for the Immrama server.")
});
// Heroku route: https://immramaserver.herokuapp.com/
//      this should be the correct URL
// DATABASE_URL="postgresql://postgres:xxxxxxxxx@localhost/Heroku-Immrama"


// User Route
app.use('/user', userController);


//Protected Routes (validated at each endpoint)
app.use('/journey', journeyController);
app.use('/chapter', chapterController);





// move this down to authentication
  


/*   DELETE WHEN FULLY FUNCTIONAL
app.listen(3000, function() {
  console.log('Immrama is listening to the tales of your journey from port 3000.')
});
*/

// move this down to authentication

app.listen(process.env.PORT, () => {
  console.log(`Immrama is listening to tales of your journey from port ${process.env.PORT}`);
})


  // SHOULD BE AT THE BOTTOM
sequelize.authenticate()          // Tests connection, of okay
  .then(() => sequelize.sync())   // syncs db
  .then(
    function() {         // fire a function that shows if we're connected
      console.log('Connected to the Immrama postgres database');
    },
    function(err) {      // fire an error if there are any errors
      console.log(err);
    }
  );









/*
app.get("/", (req, res) => {
    res.json({
      message: "Welcome to the Personary app!",
    });
  });


  sequelize.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Immrama is listening to tales of your journey from port ${process.env.PORT}`);
    })
  )
  .catch((err) => {
    console.log("[server]: The server is not listening.");
    console.log(err);
  });
*/
