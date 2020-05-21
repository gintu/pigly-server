let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let cors = require("cors");
let uuid = require("uuid");

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
