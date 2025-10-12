const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

const ownerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  pictures: String,
  gstin: Number,
});

module.exports = mongoose.model("owners", ownerSchema);
