const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
require("colors");

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

connectDB().then(() =>
  app.listen(
    PORT,
    console.log(`Server started on http://localhost:${PORT}`.yellow.bold)
  )
);
