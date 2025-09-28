const exp = require("express");
const app = exp();
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLog, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate("posts");
  console.log(user);
  res.render("profile", { user });
});

app.post("/post", isLog, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let post = await postModel.create({
    user: user._id,
    content: req.body.content,
    likes: [],
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { username, name, age, email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) {
    return res.send("User already exists");
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.send("Error generating salt");

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.send("Error hashing password");

      let user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });

      let token = jwt.sign({ email: email, userid: user._id }, "sgghh");
      res.cookie("token", token);
      res.send("User created successfully");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    return res.send("No user found");
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "sgghh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else return res.redirect("/login");
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

function isLog(req, res, next) {
  let token = req.cookies.token;

  if (!token) return res.redirect("/login");

  jwt.verify(token, "sgghh", (err, decoded) => {
    if (err) return res.send("Invalid token");
    req.user = decoded; // attach decoded user info
    next();
  });
}


app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
