const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/hotels";

// Set up MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB server");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = connectDB;
