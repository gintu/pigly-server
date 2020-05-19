let app = require("express")();
let http = require("http").createServer(app);
let io = require("socket.io")(http);
let cors = require("cors");

app.use(cors());

io.on("connection", socket => {
  console.log("a user is connected");
  // socket.emit("news", { hello: "world" });
  socket.on("join", data => {
    socket.broadcast.emit(`new user, ${data.name} has joined the chat`);

    console.log(data);
  });
  socket.on("chat message", msg => {
    console.log(msg);
    io.emit("from server", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
