const express = require("express");
const User = require("./userModel");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Create
app.get("/create", async (req, res) => {
  const user = new User({
    name: "John Doe",
    age: 30,
    email: "rish@gm.com",
  });
  await user.save();
  res.send(user);
});

// Update
app.get("/update", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { name: "John Doe" },
    { age: 31 },
    { new: true }
  );
  res.send(user);
});

// Read
app.get("/read", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Delete
app.get("/delete", async (req, res) => {
  const user = await User.findOneAndDelete({ name: "John Doe" });
  res.send(user);
});

app.listen(3000, () => console.log("Server running on port 3000"));
