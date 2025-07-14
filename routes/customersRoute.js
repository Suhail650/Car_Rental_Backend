const express = require("express");
const customersRoute = express.Router();
const customerController = require("../controllers/customerController");

customersRoute.post("/new", customerController.createNewCustomer);
customersRoute.get("/new/:adhaar", customerController.downloadFile);
customersRoute.get("/customers", customerController.getAllCustomersAndCars);

module.exports = customersRoute;
