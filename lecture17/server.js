const exp = require("express");
const app = exp();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

mongoose.connect("mongodb://127.0.0.1:27017/socialApp");

app.set("view engine", "ejs");
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/profile", isLog, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

/* ---------- Create Post ---------- */
app.post("/post", isLog, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });

  let post = await postModel.create({
    user: user._id,
    content: req.body.content,
    likes: [],
  });

  user.posts.push(post._id);
  await user.save();

  res.redirect("/profile");
});

/* ---------- Like/Unlike Post ---------- */
app.get("/like/:id", isLog, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id });

  if (!post) return res.send("Post not found");

  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
});

/* ---------- Edit Post (GET + POST) ---------- */
app.get("/edit/:id", isLog, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id });
  if (!post) return res.send("Post not found");

  res.render("edit", { post });
});

app.post("/edit/:id", isLog, async (req, res) => {
  await postModel.updateOne(
    { _id: req.params.id },
    { $set: { content: req.body.content } }
  );
  res.redirect("/profile");
});

/* ---------- Delete Post ---------- */
app.get("/delete/:id", isLog, async (req, res) => {
  await postModel.deleteOne({ _id: req.params.id });

  let user = await userModel.findOne({ email: req.user.email });
  user.posts = user.posts.filter((pid) => pid.toString() !== req.params.id);
  await user.save();

  res.redirect("/profile");
});

/* ---------- Register ---------- */
app.post("/register", async (req, res) => {
  let { username, name, age, email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.send("User already exists");

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
      res.redirect("/profile");
    });
  });
});

/* ---------- Login ---------- */
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.send("No user found");

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "sgghh");
      res.cookie("token", token);
      res.redirect("/profile");
    } else {
      return res.redirect("/login");
    }
  });
});

/* ---------- Logout ---------- */
app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

/* ---------- Middleware ---------- */
function isLog(req, res, next) {
  let token = req.cookies.token;
  if (!token) return res.redirect("/login");

  jwt.verify(token, "sgghh", (err, decoded) => {
    if (err) return res.send("Invalid token");
    req.user = decoded; // attach decoded user info
    next();
  });
}

/* ---------- Start Server ---------- */
app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
