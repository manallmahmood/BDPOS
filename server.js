const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { bgCyan } = require("colors");
require("colors");
const connectDb = require("./config/config");

// dotenv config
dotenv.config();

// Set Mongoose strictQuery option
const mongoose = require("mongoose");
mongoose.set('strictQuery', false); // or true, based on your preference

// db config
connectDb();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Root route handler
app.get('/', (req, res) => {
  res.send('Welcome to the API!');
});

// API routes
app.use("/api/items", require("./routes/itemRoutes"));

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});
