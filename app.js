require("dotenv").config(); 
const express = require("express");
const theDatabase = require("./db");

const app = express();

// const middlewares = require("./middleware");

const userController = require('./controllers/userController');
const journeyController = require('./controllers/journeyController');
const chapterController = require('./controllers/chapterController');

//app.use(middlewares.CORS);
app.use(express.json());


// Test Route
app.use('/immrama/test', function(request, response) {
  response.send("This is a test endpoint. It's from the server.")
});

// User Route
app.use('/user', userController);


//Protected Routes
//app.use("/character", middlewares.ValidateJWT, controllers.Character);
app.use('/journey', journeyController);
app.use('/chapter', chapterController);


app.listen(3000, function() {
  console.log('Immrama is listening to the tales of your journey from port 3000.')
});





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

  // SHOULD BE AT THE BOTTOM
theDatabase.authenticate()
  .then(() => theDatabase.sync())
  .then(
    function() {         // fire a function that shows if we're connected
      console.log('Connected to the Immrama postgres database');
    },
    function(err) {      // fire an error if there are any errors
      console.log(err);
    }
  );
