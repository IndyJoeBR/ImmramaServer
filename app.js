require("dotenv").config(); 
const express = require("express");
const sequelize = require("./db");

const app = express();

//const CORSmiddlewares = require("./middleware/CORSMiddleware");       //   DELETE IF NOT REQUIRED, now located in app.use directly

const userController = require('./controllers/userController');
const journeyController = require('./controllers/journeyController');
const chapterController = require('./controllers/chapterController');

app.use( require("./middleware/CORSMiddleware") );
app.use(express.json());


// Test Route   http://localhost:3000   /immrama/test
app.use('/immrama/test', function(request, response) {
  response.send("This is a test endpoint. It's from the server.")
});
// Heroku route: https://immramaserver.herokuapp.com/
//      this should be the correct URL
// DATABASE_URL="postgresql://postgres:xxxxxxxxx@localhost/Heroku-Immrama"

// DELETE THIS LINE
// DELETE THIS LINE
// DELETE THIS LINE


// User Route
app.use('/user', userController);


//Protected Routes


//app.use("/character", middlewares.ValidateJWT, controllers.Character);      TURN THIS ON AFTER HEROKU IS WORKING
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
sequelize.authenticate()
  .then(() => sequelize.sync())
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

  db.authenticate()
  .then(() => db.sync())
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on localhost:${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });

  */