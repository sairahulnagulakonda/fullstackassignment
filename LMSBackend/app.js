const express = require("express");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV || 'development'}` }); // Load .env.development if NODE_ENV is not set

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "*", // Allow all HTTP methods
  allowedHeaders: "*", // Allow all headers
};

// Enable CORS middleware with wildcard options
app.use(cors(corsOptions));

// sequelize.authenticate()
//   .then(() => {
//     console.log("Database connected...");
//     return sequelize.sync(); // Sync all models
//   })
//   .then(() => {
//     console.log("Tables have been created.");
//   })
//   .catch((error) => console.error("Database connection failed:", error));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));

app.get("/test", (req, res) => {
  res.send("Hello World!.....");
});

module.exports = app;
