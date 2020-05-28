let app = require("express")();
let cors = require("cors");
app.use(cors());
let http = require("http").createServer(app);
let io = require("socket.io")(http, { origins: "*:*" });

let uuid = require("uuid");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors());

io.on("connection", socket => {
  console.log("a user connected");

  let userData = {};

  socket.on("join room", data => {
    userData = { ...data };
    socket.join(data.room, () => {
      io.to(data.room).emit("from server", {
        message: `${data.name} has joined the chat`,
        sentBy: "admin",
        id: uuid.v4(),
        room: data.room
      });
    });
  });

  socket.on("chat message", data => {
    io.in(data.room).emit("from server", data);
  });

  socket.on("disconnect", () => {
    console.log(userData);
    console.log("user disconnected");
    io.in(userData.room).emit("from server", {
      message: `${userData.name} has left the chat`,
      sentBy: "admin",
      id: uuid.v4(),
      room: userData.room
    });
  });
});
http.listen(3000, () => {
  console.log("listening on *:3000");
});
