const carRepo = require("../repository/carRepo");

const getAllCarDetails = async (req, res, next) => {
  try {
    const carDetails = await carRepo.getAllCarDetails();
    if (carDetails.length == 0) {
      res.status(400).json({ message: "No data provided." });
    } else {
      res.status(200).json(carDetails);
    }
  } catch (error) {
    next(error);
  }
};

const getAvailableCars = async (req, res, next) => {
  try {
    const available = await carRepo.getAvailableCarDetails();
    if (available.length == 0) {
      res.status(400).json({ message: "No available vehicles" });
    } else {
      res.status(200).json(available);
    }
  } catch (error) {
    next(error);
  }
};

const createNewCar = async (req, res, next) => {
  try {
    const newCarDetails = req.body;
    const result = await carRepo.createNewCar(newCarDetails, req.file);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    next(error);
  }
};

const getCarsByFuel = async (req, res, next) => {
  try {
    const { fuel } = req.params;
    const cars = await carRepo.getCarsByFuel(fuel);
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarModel = async (req, res, next) => {
  try {
    const carModels = await carRepo.getCarModel();
    res.status(200).json(carModels);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCarDetails,
  getAvailableCars,
  createNewCar,
  getCarsByFuel,
  getCarModel,
};
