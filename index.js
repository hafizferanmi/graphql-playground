const express = require("express");
const app = express();
const port = 4500;
const { getPosts, getPost } = require("./controller/post-controller");
const { createUser } = require("./controller/user-controller");

app.get("/", getPosts);
app.get("user/add", createUser);
app.get("/post/all", getPosts);
app.get("/post/:id", getPost);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
