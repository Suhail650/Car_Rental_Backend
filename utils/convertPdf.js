const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

const pdf = async (rentedArray, customer, carArray) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, "../public/index.html");
  let htmlTemplate = fs.readFileSync(filePath, "utf-8");

  // Basic customer info replacement
  let html = htmlTemplate
    .replace("{{name}}", customer.name)
    .replace("{{adhaarNo}}", customer.adhaarNo)
    .replace("{{phone}}", customer.phone);

  // Build combined rows for each rental
  let rentalRows = "";

  for (let i = 0; i < rentedArray.length; i++) {
    const rented = rentedArray[i];
    const car = carArray[i];

    rentalRows += `
      <tr>
      <td>${i + 1}</td>
      <td>${car.name}</td>
      <td>${rented.fromDate}</td>
      <td>${rented.toDate}</td>
    </tr>
    `;
  }

  // Replace the {{rentalRows}} placeholder with built rows
  html = html.replace("{{rentalRows}}", rentalRows);

  await page.setContent(html, { waitUntil: "load" });

  await page.pdf({
    path: `uploads/${customer.adhaarNo}_invoice.pdf`,
    format: "A4",
    printBackground: true,
    landscape: false,
  });

  await browser.close();
};

module.exports = pdf;
