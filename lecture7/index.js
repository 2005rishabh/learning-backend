const exp = require("express");
const app = exp();
const path = require("path");
const fs = require("fs");
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(exp.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir("./files", function (err, files) {
    res.render("index", { files });
  });
});

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}` , "utf-8", function(err, data) {
        res.render("show", {filename: req.params.filename, data:data});       
    });
});

app.get("/edit/:filename", (req, res) => {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", (req, res) => {
//   console.log(req.body);
  fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.body,(err) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
