require("colors");
const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();

app.use(express.json()); //allow accept json data

app.get("/", (req, res) => {
  res.send("server is ready!");
});

app.use("/api/user", userRoutes);

connectDB().then(() =>
  app.listen(
    PORT,
    console.log(`Server started on http://localhost:${PORT}`.yellow.bold)
  )
);
