const { DataTypes } = require("sequelize");
const  sequelize  = require("../Config/db");

const Book = sequelize.define("Book", {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING },
  ConditionIs: { type: DataTypes.STRING },
  availability: { type: DataTypes.BOOLEAN, defaultValue: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Book;
