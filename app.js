const express = require("express");
const carRoute = require("./routes/carRoute");
const errorHandler = require("./middleware/errorHandler");
const customersRoute = require("./routes/customersRoute");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({origin: "http://localhost:3000"}));
app.use(express.json());
app.use("/api/v1/carDetails", carRoute);
app.use("/api/v1/customers", customersRoute);
app.use("/files", express.static("uploads"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Running server on http://localhost:${port}/api/v1`);
});
