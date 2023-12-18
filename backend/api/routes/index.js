const express = require("express");
const app = express.Router();

const authRoutes = require("./authRoutes");
const addressRoutes = require("./addressRoutes");
const { authCheck } = require("../middleware/authMiddleware");

app.use("/user", authRoutes);
app.use("/address", authCheck, addressRoutes);

module.exports = app;
