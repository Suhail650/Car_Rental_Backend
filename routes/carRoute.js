const express = require("express");
const carRoute = express.Router();
const carController = require("../controllers/carController");
const upload = require("../utils/multerHelper");

carRoute.get("/car", carController.getAllCarDetails);
carRoute.get("/available", carController.getAvailableCars);
carRoute.post("/new", upload.single("images"), carController.createNewCar);
carRoute.get("/fuel/:fuel", carController.getCarsByFuel);
carRoute.get("/model", carController.getCarModel);

module.exports = carRoute;
