const { Sequelize } = require("sequelize");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` }); // Ensure .env.development is loaded if NODE_ENV is not set

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;
