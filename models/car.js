const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const CarModels = require("./carModels");

const Car = sequelize.define(
  "Car",
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
    reg_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    reg_year: DataTypes.INTEGER,
    fuel_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seating_capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "available",
    },
  },
  { timestamps: false }
);

Car.belongsTo(CarModels, { foreignKey: "carModel_id" });
CarModels.hasMany(Car, { foreignKey: "carModel_id" });

module.exports = Car;
