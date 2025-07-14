const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Manufactorer = sequelize.define(
  "Manufactorer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Manufactorer;
