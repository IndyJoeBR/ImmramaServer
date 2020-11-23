module.exports = function (sequelize, DataTypes) {

  return sequelize.define('chapter', {
    chapterTitle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    chapterDate:  {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    chapterShortDesc:  {
      type: DataTypes.TEXT(300),
      allowNull: false
    },
    chapterStory:  {
      type: DataTypes.TEXT(3000),
      allowNull: false
    },
    chapterImage: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    chapterVideo: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  });
};



/*
const { DataTypes } = require('sequelize');
const theDatabase = require('../db');

const ChapterModel = theDatabase.define('chapter', {
  chapterTitle: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  chapterDate:  {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  chapterShortDesc:  {
    type: DataTypes.TEXT(300),
    allowNull: false
  },
  chapterStory:  {
    type: DataTypes.TEXT(3000),
    allowNull: false
  },
  chapterImage: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  chapterVideo: {
    type: DataTypes.STRING(200),
    allowNull: true
  }

}); //  End of User model

module.exports = ChapterModel;
*/