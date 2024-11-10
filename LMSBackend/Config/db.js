const { Sequelize } = require("sequelize");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
//Replace 'your_database', 'your_username', 'your_password', and 'your_host' with your actual PostgreSQL credentials
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;