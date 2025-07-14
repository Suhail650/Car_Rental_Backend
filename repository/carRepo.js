const Car = require("../models/car");
const CarModels = require("../models/carModels");
const Manufactorer = require("../models/manufactorer");
const {
  structoredCarDetails,
  structuredModels,
} = require("../services/carService");
const port = process.env.PORT || 3000;

const getAllCarDetails = async () => {
  try {
    const cars = await Car.findAll({
      attributes: [
        "id",
        "name",
        "reg_no",
        "reg_year",
        "fuel_type",
        "seating_capacity",
        "image",
        "status",
      ],
      include: [
        {
          model: CarModels,
          attributes: ["name"],
          include: [
            {
              model: Manufactorer,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    const allCars = structoredCarDetails(cars);
    return allCars;
  } catch (error) {
    return error;
  }
};

const getAvailableCarDetails = async () => {
  try {
    const cars = await Car.findAll({
      where: {
        status: "available",
      },
      attributes: [
        "id",
        "name",
        "reg_no",
        "reg_year",
        "fuel_type",
        "seating_capacity",
        "image",
        "status",
      ],
      include: [
        {
          model: CarModels,
          attributes: ["name"],
          include: [
            {
              model: Manufactorer,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    const allCars = structoredCarDetails(cars);
    return allCars;
  } catch (error) {
    return error;
  }
};

const createNewCar = async (carDetails, image) => {
  try {
    const [manufactorer] = await Manufactorer.findOrCreate({
      where: { name: carDetails.manufactorer },
      defaults: { name: carDetails.manufactorer },
    });
    const [carModel] = await CarModels.findOrCreate({
      where: { name: carDetails.model },
      defaults: {
        name: carDetails.model,
        manufactorer_id: manufactorer.id,
      },
    });
    const car = await Car.create({
      name: carDetails.name,
      reg_no: carDetails.reg_no,
      reg_year: carDetails.reg_year,
      fuel_type: carDetails.fuel_type,
      seating_capacity: carDetails.seating_capacity,
      image: `http://localhost:${port}/files/${image.filename}`,
      carModel_id: carModel.id,
    });
    return { status: 201, message: `New car ${car.name} created successfully` };
  } catch (error) {
    return { status: 400, message: error };
  }
};

const getCarsByFuel = async (fuelType) => {
  try {
    const cars = await Car.findAll({
      where: { fuel_type: fuelType },
    });
    if (cars.length == 0) {
      return `No vehicles available in ${fuelType}`;
    } else {
      return cars;
    }
  } catch (error) {
    return error;
  }
};

const getCarModel = async () => {
  const carModel = await CarModels.findAll({
    atributes: ["name"],
  });
  const models = structuredModels(carModel);
  return models;
};

module.exports = {
  getAllCarDetails,
  getAvailableCarDetails,
  createNewCar,
  getCarsByFuel,
  getCarModel,
};
