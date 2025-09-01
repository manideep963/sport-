const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const newsRoutes = require("./routes/newsRoutes");
const sportRoutes = require("./routes/sportRoutes");
const matchRoutes = require("./routes/matchRoutes");
const tourRoutes = require("./routes/tourRoutes");
const connectDB = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", matchRoutes);
app.use("/news", newsRoutes);
app.use("/sport", sportRoutes);
app.use("/tour", tourRoutes);

connectDB()
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => {
    console.error("Failed to connect to DB, server not started", err);
    process.exit(1);
  });

