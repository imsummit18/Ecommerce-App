const express = require("express");
const app = express();
var cors = require("cors");
var morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connecDB = require("./db/conn");
const routes = require("./api/routes");
const AppError = require("./appError");
const globalErrorHandler = require("./api/controller/errorController");


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} in this Server`));
});
app.use(globalErrorHandler);

const start = async () => {
  await connecDB("mongodb://localhost:27017/reactnative");
  app.listen(8000, () => {
    console.log("listening");
  });
};

start();
