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
        // if (err) {
            // console.error("Error reading directory:", err);
        //     return res.status(500).send("Error reading files");
        // }
        console.log(files);

        res.render("index", { files });
    });
});


app.listen(3000, () => {
  console.log("Server started at port 3000");
});
