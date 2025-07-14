const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Customer = require("./customer");
const Car = require("./car");

const CustomerCarRental = sequelize.define(
  "CustomerCarRental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fromDate: DataTypes.STRING,
    toDate: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
  },
  { timestamps: false }
);

CustomerCarRental.belongsTo(Customer, { foreignKey: "customer_id" });
Customer.hasMany(CustomerCarRental, { foreignKey: "customer_id" });
CustomerCarRental.belongsTo(Car, { foreignKey: "car_id" });
Car.hasMany(CustomerCarRental, { foreignKey: "car_id" });

module.exports = CustomerCarRental;
