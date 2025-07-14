const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Manufactorer = require("./manufactorer");

const CarModels = sequelize.define(
  "CarModel",
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

CarModels.belongsTo(Manufactorer, { foreignKey: "manufactorer_id" });
Manufactorer.hasMany(CarModels, { foreignKey: "manufactorer_id" });

module.exports = CarModels;
