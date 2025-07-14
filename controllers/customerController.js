const customerRepo = require("../repository/customerRepo");
const pdf = require("../utils/convertPdf");
const path = require("path");
const fs = require("fs");
const { structoredCustomers } = require("../services/customerService");

const createNewCustomer = async (req, res, next) => {
  try {
    const newCustomer = req.body;
    const result = await customerRepo.createNewCustomer(newCustomer);
    if (typeof result === "object") {
      res.status(201).json({ message: "car booked" });
    } else {
      res.status(400).json({ message: result });
    }
  } catch (error) {
    next(error);
  }
};

const downloadFile = async (req, res, next) => {
  try {
    const { adhaar } = req.params;
    const { carRental, customer, cars } = await customerRepo.downloadFile(
      adhaar
    );

    await pdf(carRental, customer, cars);

    const filePath = path.join(__dirname, `../uploads/${adhaar}_invoice.pdf`);

    // Check if file exists
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${adhaar}_invoice.pdf`
      );

      // Send file to client
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.status(404).json({ error: "Invoice not found" });
    }
  } catch (error) {
    next(error);
  }
};

const getAllCustomersAndCars = async (req, res, next) => {
  try {
    const details = await customerRepo.getAllCustomersAndCars();
    const structored = structoredCustomers(details);
    res.status(200).json(structored);
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewCustomer, downloadFile, getAllCustomersAndCars };
