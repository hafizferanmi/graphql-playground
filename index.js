const express = require("express");
const app = express();
const port = 4500;
const {
  getPosts,
  getPost,
  createPost,
} = require("./controller/post-controller");
const { getUsers } = require("./controller/user-controller");

app.get("/", getUsers);
app.get("/post/create", createPost);
app.get("/post/all", getPosts);
app.get("/post/:id", getPost);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
