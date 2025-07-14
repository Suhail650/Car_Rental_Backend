const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Customer = sequelize.define(
  "Customer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adhaarNo: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      is: {
        arg: /^[2-9]\d{11}$/,
        msg: "Invalid Aadhaar Number",
      },
    },
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  { timestamps: false }
);

module.exports = Customer;
