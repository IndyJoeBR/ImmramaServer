const Sequelize = require('sequelize');     // Import Sequelize package  

const theDatabase = new Sequelize(    // Immrama's sequelize
  'immrama',               // name of database
  'postgres',              // name of database super-user
  'dbpassword', {          // database password
  host: 'localhost',       // host points to local port (5432 for Sequelize)
  dialect: 'postgres'      // SQL dialect used
});

//const theDatabase = new Sequelize(process.env.DATABASE_URL, {dialect: "postgres"});


// Create Database Associations
const UserModel = theDatabase.import("./Models/User");
const JourneyModel = theDatabase.import("./Models/Journey");
const ChapterModel = theDatabase.import("./Models/Chapter");
//const UserModel = Sequelize.import("./Models/User");
//const JourneyModel = Sequelize.import("./Models/Journey");
//const ChapterModel = Sequelize.import("./Models/Chapter");

// Setup Associations
UserModel.hasMany(JourneyModel);
JourneyModel.belongsTo(UserModel);

JourneyModel.hasMany(ChapterModel, {    // adds 'journey_id' to Chapters table
  onDelete: "CASCADE",                  //     this holds which journey the chapter is in}
});
ChapterModel.belongsTo(JourneyModel)

// Future only - not intended for immediate use
//  - potentially usable to look up contents of chapters by search
UserModel.hasMany(ChapterModel);
ChapterModel.belongsTo(UserModel);



module.exports = theDatabase;