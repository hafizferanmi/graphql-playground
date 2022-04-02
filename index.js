const express = require("express");
const app = express();
const port = 4500;
const { getPosts } = require("./controller/post-controller");
const { createUser } = require("./controller/user-controller");

app.get("/", getPosts);
app.get("/create-user", createUser);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
