const exp = require("express");
const app = exp();

const path = require("path");
const cookieParser = require("cookie-parser");
const user = require("./models/user");
const { parseArgs } = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(exp.static(path.join(__dirname, "public")));
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  // console.log(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) throw err;
      let cuser = await user.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "jkjkjlkjkk");
      res.cookie("token", token);
      res.send(cuser);
    });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
