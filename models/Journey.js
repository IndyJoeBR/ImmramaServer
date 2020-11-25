module.exports = function (sequelize, DataTypes) {

  return sequelize.define('journey', {
    JourneyUsername: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    journeyTitle:  {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    journeyStartDate:  {
      type: DataTypes.DATE(50),
      allowNull: false
    },
    journeyEndDate:  {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    journeyDesc: {
      type: DataTypes.TEXT(300),
      allowNull: false
    }
  });
};


/*
const { DataTypes } = require('sequelize');
const theDatabase = require('../db');


const JourneyModel = theDatabase.define('journey', {
  JourneyUsername: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  journeyTitle:  {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  journeyStartDate:  {
    type: DataTypes.DATE(50),
    allowNull: false
  },
  journeyEndDate:  {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  journeyDesc: {
    type: DataTypes.TEXT(300),
    allowNull: false
  }
}); //  End of User model

// userId (journeyOwner) is also available

module.exports = JourneyModel;

*/