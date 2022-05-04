const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const {
  socketAuth,
  doSocket,
  socketIOMiddleware,
} = require("./auth-socket-middleware");
const app = express();
const port = 4500;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: "*",
});

doSocket(io);
// console.log(
//   createHttpError(StatusCodes.UNPROCESSABLE_ENTITY, {
//     message: "We cant process this requset at this time",
//   })
// );

const {
  getPosts,
  getPost,
  createPost,
} = require("./controller/post-controller");
const { getUsers } = require("./controller/user-controller");

app.use(socketIOMiddleware(io));

app.get("/", getUsers);
app.get("/post/create", createPost);
app.get("/post/all", getPosts);
app.get("/post/:id", getPost);

//* Catch HTTP 404
app.use((req, res, next) => {
  next(createHttpError(404));
});

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);

  res.json({
    error: {
      status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || get,
    },
  });
});

httpServer.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
