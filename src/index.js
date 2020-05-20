let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let cors = require("cors");
let uuid = require("uuid");

app.use(cors());

io.on("connection", socket => {
  console.log("a user is connected");

  socket.on("join", data => {
    // socket.broadcast.emit("from server", {
    //   message: `${data.name} has joined the chat`,
    //   sentBy: "admin",
    //   id: uuid.v4(),
    //   room: data.room
    // });

    console.log(data);
  });
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("from server", msg);
  });

  socket.on("disconnect", name => {
    // socket.broadcast.emit("from server", {
    //   message: `${name} has joined the chat`,
    //   sentBy: "admin",
    //   id: uuid.v4(),
    //   room: ""
    // });

    console.log("user is disonnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
