const exp = require("express");
const app = exp();
const userModel = require("./models/users");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "John Doe",
    age: 23,
    email: "njlnj@gmail.com",
  });

  res.send(user);
});

app.get("/post/create", async (req,res)=>{
  let post = await postModel.create({
    postdata: "This is my first post",
    user: "68d7d54e68cd7a5738cea68c",
  });

  let user = await userModel.findOne({_id: "68d7d54e68cd7a5738cea68c"})
  user.posts.push(post._id);
  await user.save();
  res.send({post, user});
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("http://localhost:3000");
});
