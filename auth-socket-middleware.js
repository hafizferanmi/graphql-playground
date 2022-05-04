const socketAuth = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    const err = new Error("not authorized");
    err.data = { content: "Please retry later" };
    next(err);
  }

  socket.username = socket.handshake.query.username;
  next();
};

exports.socketIOMiddleware = (io) => (req, res, next) => {
  req.io = io;
  next();
};

exports.doSocket = (io) => {
  io.use(socketAuth);

  io.on("connection", (socket) => {
    socket.join(socket.id);

    socket.on("LOT:HOVER", async ({ lotId }) => {
      console.log(lotId, socket.username);
    });

    socket.on("LOT:IN:VIEW", ({ lotId }) => {
      console.log(lotId, "c");
      socket.join(`LOT:IN:VIEW:${lotId}`);
    });

    socket.on("disconnect", (reason) => {
      console.log(reason);
    });
  });
};
