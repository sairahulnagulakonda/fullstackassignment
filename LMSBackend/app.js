const express = require("express");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
console.log(":::AT::: in app.js");
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "*", // Allow all HTTP methods
  allowedHeaders: "*", // Allow all headers
};

// Enable CORS middleware with wildcard options
app.use(cors(corsOptions));
// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));


app.get("/test", (req, res) => {
  res.send("Hello World!.....");
});

module.exports = app;
