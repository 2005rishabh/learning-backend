const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());

app.get("/", function (req, res) {
    let token = jwt.sign({ email: "rishabh@example.com" }, "secret");
    res.cookie("token", token);
    res.send(token);
    console.log("Issued Token:", token);
});

app.get("/read", function (req, res) {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
