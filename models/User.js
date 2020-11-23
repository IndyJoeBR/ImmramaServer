module.exports = function (sequelize, DataTypes) {

  return sequelize.define('user', {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    passwordhash: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });  
};



/*
const { DataTypes, sequelize } = require('sequelize');
const theDatabase = require('../db');

const UserModel = sequelize.define('user', {
  username: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  passwordhash: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userEmail: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  userAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }

}); //  End of User model

module.exports = UserModel;
*/