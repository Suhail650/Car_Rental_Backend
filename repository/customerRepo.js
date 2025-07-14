const Car = require("../models/car");
const Customer = require("../models/customer");
const CustomerCarRental = require("../models/customerCarRental");
const { setFromDate, setToDate } = require("../services/customerService");

const createNewCustomer = async (customerDetails) => {
  try {
    const car = await Car.findOne({
      where: { name: customerDetails.car },
    });
    if (car.status === "not available") {
      return "Car not available";
    } else {
      let customer = await Customer.findOne({
        where: { adhaarNo: customerDetails.adhaarNo },
      });
      if (customer === null) {
        customer = await Customer.create({
          name: customerDetails.name,
          adhaarNo: customerDetails.adhaarNo,
          phone: customerDetails.phone,
          email: customerDetails.email,
        });
      }
      await Car.update(
        {
          status: "not available",
        },
        {
          where: {
            name: customerDetails.car,
          },
        }
      );
      const rentDetails = await CustomerCarRental.create({
        fromDate: setFromDate(),
        toDate: setToDate(customerDetails.days),
        customer_id: customer.id,
        car_id: car.id,
      });
      return rentDetails;
    }
  } catch (error) {
    return error.message;
  }
};

const downloadFile = async (adhaar) => {
  try {
    const customer = await Customer.findOne({
      where: { adhaarNo: adhaar },
    });

    const carRental = await CustomerCarRental.findAll({
      where: { customer_id: customer.id },
    });

    const cars = await Promise.all(
      carRental.map((rental) => Car.findByPk(rental.car_id))
    );

    return { carRental, customer, cars };
  } catch (error) {
    return error;
  }
};

const getAllCustomersAndCars = async () => {
  try {
    const allData = await Customer.findAll({
      attributes: ["name", "phone"],
      include: [
        {
          model: CustomerCarRental,
          attributes: ["status", "toDate"],
          include: [
            {
              model: Car,
              attributes: ["name"],
            },
          ],
        },
      ],
    });
    return allData;
  } catch (error) {
    return error;
  }
};

module.exports = { createNewCustomer, downloadFile, getAllCustomersAndCars };
