const mongoose = require("mongoose");
const dbgr = require("debug")("development: mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    "Mongodb connected";
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
