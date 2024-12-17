const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// import routes
const carRoutes = require("./src/routes/carRoutes");

// Use middleware to parse JSON
app.use(bodyParser.json());

// Connect routes
app.use("/api/cars", carRoutes);

// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
