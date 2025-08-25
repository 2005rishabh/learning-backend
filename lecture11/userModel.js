const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mongodbDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
