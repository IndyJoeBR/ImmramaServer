/*    RESERVERED FOR LATER FUNCTIONALITY
const UserModel = require("./User");
const JourneyModel = require("./Journey");
const ChapterModel = require("./Chapter");

// Setup Associations
UserModel.hasMany(JourneyModel, {
  foreignKey: {
    name: journey_owner,
    allowNull: false
  }
});
JourneyModel.belongsTo(UserModel);

JourneyModel.hasMany(ChapterModel, {
  onDelete: "CASCADE",
  foreignKey: {
    name: journey_id,
    allowNull: false
  }
});
ChapterModel.belongsTo(JourneyModel)

// Future only - not intended for immediate use
//  - potentially usable to look up contents of chapters by search
UserModel.hasMany(ChapterModel, {
  foreignKey: {
    name: chapter_owner,
    allowNull: true
  }
});
ChapterModel.belongsTo(UserModel, {
  allowNull: true
});

module.exports = {
  UserModel,
  JourneyModel,
  ChapterModel
};

*/