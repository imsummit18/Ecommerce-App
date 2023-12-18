const mongoose = require("mongoose");
const connecDB = (url) => {
  return mongoose
    .connect(url, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      // useFindAndModify: true,
      // useCreateIndex: true,
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("Error while connecting to database");
    });
};
module.exports = connecDB;
