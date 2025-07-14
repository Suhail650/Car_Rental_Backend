const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Synced");
    console.log("Connected successfully");
  } catch (error) {
    console.log(`Connection failed : ${error}`);
  }
})();

module.exports = sequelize;
